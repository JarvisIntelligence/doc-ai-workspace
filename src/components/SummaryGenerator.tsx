
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
    <div className="h-full flex flex-col p-6">
      {!summary && !isGenerating && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate AI Summary</h3>
            <p className="text-gray-600 mb-6">
              Get a comprehensive summary of your document with key points, takeaways, and section breakdowns.
            </p>
            <Button 
              onClick={generateSummary}
              disabled={credits < 5}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              Generate Summary (5 credits)
            </Button>
            {credits < 5 && (
              <p className="text-red-600 text-sm mt-2">Not enough credits</p>
            )}
          </div>
        </div>
      )}

      {isGenerating && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating Summary...</h3>
            <p className="text-gray-600 mb-4">AI is analyzing your document</p>
            <div className="w-full max-w-xs mx-auto">
              <Progress value={progress} className="mb-2" />
              <p className="text-sm text-gray-500">{progress}% complete</p>
            </div>
          </div>
        </div>
      )}

      {summary && (
        <div className="flex-1 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Summary Generated</h3>
            </div>
            <Button variant="outline" size="sm" onClick={copySummary}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Main Points</h4>
              <ul className="space-y-2">
                {summary.mainPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{point}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Key Takeaways</h4>
              <div className="space-y-2">
                {summary.keyTakeaways.map((takeaway, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-900">{takeaway}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Section Breakdown</h4>
              <div className="space-y-3">
                {summary.sections.map((section, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-1">{section.title}</h5>
                    <p className="text-gray-600 text-sm">{section.summary}</p>
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
