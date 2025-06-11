
import React, { useState } from 'react';
import { HelpCircle, Zap, CheckCircle, RotateCcw, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const QuizGenerator = ({ document, credits, onDeductCredits }) => {
  const [quiz, setQuiz] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const generateQuiz = async () => {
    if (credits < 8) {
      alert("Not enough credits! You need 8 credits to generate a quiz.");
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 15;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        setQuiz({
          questions: [
            {
              id: 1,
              type: 'multiple-choice',
              question: 'What is the primary goal of supervised learning?',
              options: [
                'To find patterns in unlabeled data',
                'To learn from labeled training data to make predictions',
                'To reduce the dimensionality of data',
                'To cluster similar data points'
              ],
              correct: 1,
              explanation: 'Supervised learning uses labeled training data to learn patterns and make predictions on new, unseen data.'
            },
            {
              id: 2,
              type: 'multiple-choice',
              question: 'Which algorithm is commonly used for classification tasks?',
              options: [
                'K-means clustering',
                'Principal Component Analysis',
                'Decision Trees',
                'Hierarchical clustering'
              ],
              correct: 2,
              explanation: 'Decision Trees are a popular supervised learning algorithm used for both classification and regression tasks.'
            },
            {
              id: 3,
              type: 'short-answer',
              question: 'Explain what overfitting means in machine learning and how to prevent it.',
              answer: 'Overfitting occurs when a model learns the training data too well, including noise and irrelevant patterns, leading to poor performance on new data. It can be prevented through cross-validation, regularization, early stopping, and using more training data.',
              explanation: 'Overfitting is a common problem where models perform well on training data but poorly on test data.'
            },
            {
              id: 4,
              type: 'multiple-choice',
              question: 'What is the purpose of cross-validation?',
              options: [
                'To increase model complexity',
                'To evaluate model performance and prevent overfitting',
                'To reduce training time',
                'To increase the size of the dataset'
              ],
              correct: 1,
              explanation: 'Cross-validation helps evaluate how well a model generalizes to unseen data and helps detect overfitting.'
            },
            {
              id: 5,
              type: 'short-answer',
              question: 'What are the key differences between supervised and unsupervised learning?',
              answer: 'Supervised learning uses labeled data to learn patterns and make predictions, while unsupervised learning finds patterns in unlabeled data without knowing the correct output. Supervised learning includes classification and regression, while unsupervised includes clustering and dimensionality reduction.',
              explanation: 'This is a fundamental distinction in machine learning approaches.'
            }
          ]
        });
        onDeductCredits(8);
        setIsGenerating(false);
        setProgress(0);
        setCurrentQuestion(0);
        setAnswers({});
        setShowResults(false);
      }, 500);
    }, 2500);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleTextAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    let correct = 0;
    quiz.questions.forEach(q => {
      if (q.type === 'multiple-choice' && answers[q.id] === q.correct) {
        correct++;
      }
      // For short answers, we'll assume they're correct for demo purposes
      if (q.type === 'short-answer' && answers[q.id] && answers[q.id].length > 10) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  if (!quiz && !isGenerating) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate AI Quiz</h3>
          <p className="text-gray-600 mb-6">
            Create an interactive quiz with multiple choice and short answer questions based on your document.
          </p>
          <Button 
            onClick={generateQuiz}
            disabled={credits < 8}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Zap className="w-4 h-4 mr-2" />
            Generate Quiz (8 credits)
          </Button>
          {credits < 8 && (
            <p className="text-red-600 text-sm mt-2">Not enough credits</p>
          )}
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-purple-600 animate-pulse" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating Quiz...</h3>
          <p className="text-gray-600 mb-4">AI is creating questions from your document</p>
          <div className="w-full max-w-xs mx-auto">
            <Progress value={progress} className="mb-2" />
            <p className="text-sm text-gray-500">{progress}% complete</p>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="h-full overflow-y-auto p-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h3>
          <p className="text-lg text-gray-600">Your Score: <span className="font-bold text-green-600">{score}%</span></p>
        </div>

        <div className="space-y-6">
          {quiz.questions.map((question, index) => (
            <div key={question.id} className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">
                Question {index + 1}: {question.question}
              </h4>
              
              {question.type === 'multiple-choice' && (
                <div className="space-y-2 mb-3">
                  {question.options.map((option, optIndex) => (
                    <div 
                      key={optIndex}
                      className={`p-2 rounded border ${
                        optIndex === question.correct 
                          ? 'bg-green-100 border-green-300' 
                          : answers[question.id] === optIndex
                            ? 'bg-red-100 border-red-300'
                            : 'bg-gray-50'
                      }`}
                    >
                      {option}
                      {optIndex === question.correct && <span className="text-green-600 ml-2">✓ Correct</span>}
                      {answers[question.id] === optIndex && optIndex !== question.correct && <span className="text-red-600 ml-2">✗ Your answer</span>}
                    </div>
                  ))}
                </div>
              )}

              {question.type === 'short-answer' && (
                <div className="mb-3">
                  <div className="bg-blue-50 p-3 rounded border">
                    <strong>Your answer:</strong> {answers[question.id] || 'No answer provided'}
                  </div>
                  <div className="bg-green-50 p-3 rounded border mt-2">
                    <strong>Sample answer:</strong> {question.answer}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                <strong>Explanation:</strong> {question.explanation}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button onClick={resetQuiz} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];

  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </h3>
        <div className="text-sm text-gray-600">
          {Object.keys(answers).length}/{quiz.questions.length} answered
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            {currentQ.question}
          </h4>

          {currentQ.type === 'multiple-choice' && (
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQ.id, index)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    answers[currentQ.id] === index
                      ? 'bg-blue-50 border-blue-300 text-blue-900'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQ.type === 'short-answer' && (
            <textarea
              value={answers[currentQ.id] || ''}
              onChange={(e) => handleTextAnswer(currentQ.id, e.target.value)}
              placeholder="Type your answer here..."
              className="w-full h-32 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>

        {currentQuestion === quiz.questions.length - 1 ? (
          <Button
            onClick={submitQuiz}
            disabled={Object.keys(answers).length < quiz.questions.length}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizGenerator;
