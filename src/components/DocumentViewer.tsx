
import React, { useState } from 'react';
import { ArrowLeft, FileText, Brain, HelpCircle, MessageSquare, Download, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AIChat from './AIChat';
import SummaryGenerator from './SummaryGenerator';
import QuizGenerator from './QuizGenerator';

const DocumentViewer = ({ document, onBack, credits, onDeductCredits }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Header */}
      <div className="border-b bg-gray-50 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
            <Button variant="ghost" size="sm" onClick={onBack} className="flex-shrink-0">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Library</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="text-xl sm:text-2xl flex-shrink-0">{document.thumbnail}</div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">{document.title}</h1>
                <p className="text-xs sm:text-sm text-gray-600">{document.pages} pages • {document.size}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              <Share className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-200px)] sm:h-[calc(100vh-250px)] lg:h-[calc(100vh-300px)]">
        {/* Document Preview */}
        <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r bg-gray-50 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 min-h-full">
            <div className="text-center mb-6 lg:mb-8">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Document Preview</h3>
              <p className="text-sm sm:text-base text-gray-600">In a real app, this would show the actual document content</p>
            </div>
            
            {/* Mock document content */}
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{document.title}</h2>
              <p>This is a preview of the document content. In the actual implementation, this would display the real PDF or DOCX content using a document viewer library.</p>
              <p>The document covers various topics and concepts that students can interact with using the AI features on the right side of the screen.</p>
              <p>Students can generate summaries, create quizzes, and ask specific questions about the content to enhance their learning experience.</p>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg mt-4 sm:mt-6">
                <h3 className="font-semibold text-blue-900 mb-2">Key Features Available:</h3>
                <ul className="list-disc list-inside text-blue-800 space-y-1 text-xs sm:text-sm">
                  <li>AI-powered summaries</li>
                  <li>Automated quiz generation</li>
                  <li>Interactive Q&A chat</li>
                  <li>Document sharing with classmates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* AI Tools Panel */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Tabs */}
          <div className="border-b bg-white">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('summary')}
                className={`flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'summary'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Summary</span>
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'quiz'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Quiz</span>
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'chat'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Chat</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'summary' && (
              <SummaryGenerator 
                document={document} 
                credits={credits}
                onDeductCredits={onDeductCredits}
              />
            )}
            {activeTab === 'quiz' && (
              <QuizGenerator 
                document={document}
                credits={credits}
                onDeductCredits={onDeductCredits}
              />
            )}
            {activeTab === 'chat' && (
              <AIChat 
                document={document}
                credits={credits}
                onDeductCredits={onDeductCredits}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
