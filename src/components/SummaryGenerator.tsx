
import React, { useState } from 'react';
import { Brain, Zap, CheckCircle, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const SummaryGenerator = ({ document, credits, onDeductCredits }) => {
  const [summary, setSummary] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateSummary = async () => {
    if (credits < 5) {
      alert("Not enough credits! You need 5 credits to generate a summary.");
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        setSummary({
          mainPoints: [
            "Introduction to fundamental machine learning concepts and algorithms",
            "Detailed exploration of supervised learning techniques including regression and classification",
            "Comprehensive coverage of unsupervised learning methods such as clustering and dimensionality reduction",
            "Practical applications and real-world examples across various industries",
            "Best practices for model evaluation, validation, and performance optimization"
          ],
          keyTakeaways: [
            "Machine learning is a subset of artificial intelligence focused on pattern recognition",
            "Proper data preprocessing is crucial for model performance",
            "Cross-validation helps prevent overfitting and ensures model generalization",
            "Feature selection and engineering significantly impact model accuracy"
          ],
          sections: [
            { title: "Chapter 1: Introduction", summary: "Overview of ML history and basic concepts" },
            { title: "Chapter 2: Supervised Learning", summary: "Linear regression, logistic regression, decision trees" },
            { title: "Chapter 3: Unsupervised Learning", summary: "K-means clustering, hierarchical clustering, PCA" },
            { title: "Chapter 4: Model Evaluation", summary: "Metrics, validation techniques, and performance optimization" }
          ]
        });
        onDeductCredits(5);
        setIsGenerating(false);
        setProgress(0);
      }, 500);
    }, 2000);
  };

  const copySummary = () => {
    const summaryText = `
Summary of ${document.title}

Main Points:
${summary.mainPoints.map(point => `• ${point}`).join('\n')}

Key Takeaways:
${summary.keyTakeaways.map(point => `• ${point}`).join('\n')}

Section Breakdown:
${summary.sections.map(section => `${section.title}: ${section.summary}`).join('\n')}
    `;
    navigator.clipboard.writeText(summaryText);
    alert("Summary copied to clipboard!");
  };

  return (
    <div className="h-full flex flex-col p-2 sm:p-3 lg:p-6">
      {!summary && !isGenerating && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-xs sm:max-w-sm px-2 sm:px-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600" />
            </div>
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2">Generate AI Summary</h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              Get a comprehensive summary with key points and takeaways.
            </p>
            <Button 
              onClick={generateSummary}
              disabled={credits < 5}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs sm:text-sm w-full sm:w-auto"
              size="sm"
            >
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Generate Summary (5 credits)
            </Button>
            {credits < 5 && (
              <p className="text-red-600 text-xs mt-2">Not enough credits</p>
            )}
          </div>
        </div>
      )}

      {isGenerating && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-xs sm:max-w-sm px-2 sm:px-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600 animate-pulse" />
            </div>
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2">Generating Summary...</h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4">AI is analyzing your document</p>
            <div className="w-full max-w-48 sm:max-w-xs mx-auto">
              <Progress value={progress} className="mb-2 h-2" />
              <p className="text-xs text-gray-500">{progress}% complete</p>
            </div>
          </div>
        </div>
      )}

      {summary && (
        <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 lg:space-y-6">
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">Summary Generated</h3>
            </div>
            <Button variant="outline" size="sm" onClick={copySummary} className="text-xs w-full xs:w-auto">
              <Copy className="w-3 h-3 mr-1 sm:mr-2" />
              Copy
            </Button>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Main Points</h4>
              <ul className="space-y-2">
                {summary.mainPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm sm:text-base text-gray-700">{point}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Key Takeaways</h4>
              <div className="space-y-2">
                {summary.keyTakeaways.map((takeaway, index) => (
                  <div key={index} className="bg-blue-50 p-2 sm:p-3 rounded-lg">
                    <p className="text-blue-900 text-xs sm:text-sm">{takeaway}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Section Breakdown</h4>
              <div className="space-y-3">
                {summary.sections.map((section, index) => (
                  <div key={index} className="border rounded-lg p-3 sm:p-4">
                    <h5 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">{section.title}</h5>
                    <p className="text-gray-600 text-xs sm:text-sm">{section.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryGenerator;
