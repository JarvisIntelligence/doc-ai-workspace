
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
      <div className="border-b bg-gray-50 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <Button variant="ghost" size="sm" onClick={onBack} className="flex-shrink-0 px-2 sm:px-3">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Back</span>
            </Button>
            <div className="flex items-center space-x-1 sm:space-x-2 min-w-0 flex-1">
              <div className="text-lg sm:text-xl lg:text-2xl flex-shrink-0">{document.thumbnail}</div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-900 truncate">{document.title}</h1>
                <p className="text-xs text-gray-600">{document.pages} pages • {document.size}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <Button variant="outline" size="sm" className="text-xs px-2 sm:px-3">
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline ml-1 sm:ml-2">Download</span>
            </Button>
            <Button variant="outline" size="sm" className="text-xs px-2 sm:px-3">
              <Share className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline ml-1 sm:ml-2">Share</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-180px)] sm:min-h-[calc(100vh-220px)] lg:min-h-[calc(100vh-280px)] max-h-[calc(100vh-180px)] sm:max-h-[calc(100vh-220px)] lg:max-h-[calc(100vh-280px)]">
        {/* Document Preview */}
        <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r bg-gray-50 p-2 sm:p-3 lg:p-6 overflow-y-auto h-64 sm:h-80 lg:h-full">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-8 h-full">
            <div className="text-center mb-4 sm:mb-6">
              <FileText className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-gray-400 mx-auto mb-2 sm:mb-4" />
              <h3 className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 mb-1 sm:mb-2">Document Preview</h3>
              <p className="text-xs sm:text-sm text-gray-600">Preview of {document.title}</p>
            </div>
            
            {/* Mock document content */}
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed overflow-y-auto">
              <h2 className="text-sm sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">{document.title}</h2>
              <p className="hidden sm:block">This is a preview of the document content. In the actual implementation, this would display the real PDF or DOCX content using a document viewer library.</p>
              <p className="sm:hidden">Document preview would appear here in a real implementation.</p>
              <div className="bg-blue-50 p-2 sm:p-3 rounded-lg mt-2 sm:mt-4">
                <h3 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-xs sm:text-sm">Available Features:</h3>
                <ul className="list-disc list-inside text-blue-800 space-y-0.5 sm:space-y-1 text-xs">
                  <li>AI summaries</li>
                  <li>Quiz generation</li>
                  <li>Q&A chat</li>
                  <li className="hidden sm:list-item">Document sharing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* AI Tools Panel */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Tabs */}
          <div className="border-b bg-white sticky top-0 z-10">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab('summary')}
                className={`flex items-center justify-center space-x-1 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap flex-1 min-w-0 ${
                  activeTab === 'summary'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Brain className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">Summary</span>
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center justify-center space-x-1 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap flex-1 min-w-0 ${
                  activeTab === 'quiz'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">Quiz</span>
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center justify-center space-x-1 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap flex-1 min-w-0 ${
                  activeTab === 'chat'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">Chat</span>
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
