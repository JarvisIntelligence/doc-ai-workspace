
import React, { useState } from 'react';
import { ArrowLeft, FileText, Brain, HelpCircle, MessageSquare, Download, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AIChat from './AIChat';
import SummaryGenerator from './SummaryGenerator';
import QuizGenerator from './QuizGenerator';

const DocumentViewer = ({ document, onBack, credits, onDeductCredits }) => {
  const [activeTab, setActiveTab] = useState('preview');
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

      <div className="flex flex-col min-h-[calc(100vh-180px)] sm:min-h-[calc(100vh-220px)] lg:min-h-[calc(100vh-280px)] max-h-[calc(100vh-180px)] sm:max-h-[calc(100vh-220px)] lg:max-h-[calc(100vh-280px)]">
        {/* AI Tools Panel */}
        <div className="w-full flex flex-col">
          {/* Tabs */}
          <div className="border-b bg-white sticky top-0 z-10">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center justify-center space-x-1 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap flex-1 min-w-0 ${
                  activeTab === 'preview'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">Preview</span>
              </button>
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
            {activeTab === 'preview' && (
              <div className="h-full bg-gray-50 p-3 sm:p-4 lg:p-6 overflow-y-auto">
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 h-full">
                  <div className="text-center mb-4 sm:mb-6">
                    <FileText className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-gray-400 mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 mb-2">Document Preview</h3>
                    <p className="text-sm sm:text-base text-gray-600">Full preview of {document.title}</p>
                  </div>
                  
                  {/* Mock document content */}
                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed overflow-y-auto">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{document.title}</h2>
                    <p>This is a full preview of the document content. In the actual implementation, this would display the real PDF or DOCX content using a document viewer library like PDF.js or React-PDF.</p>
                    <p>The document contains {document.pages} pages of content with detailed information and analysis. Users can now view the complete document in this dedicated preview tab without it interfering with the AI tools.</p>
                    
                    <div className="bg-blue-50 p-4 sm:p-6 rounded-lg mt-4 sm:mt-6">
                      <h3 className="font-semibold text-blue-900 mb-3 text-base sm:text-lg">Available AI Features:</h3>
                      <ul className="list-disc list-inside text-blue-800 space-y-2 text-sm sm:text-base">
                        <li>Generate AI-powered summaries of the document content</li>
                        <li>Create interactive quizzes to test comprehension</li>
                        <li>Chat with AI about specific sections or concepts</li>
                        <li>Download and share the document with others</li>
                      </ul>
                    </div>
                    
                    <div className="mt-6 sm:mt-8">
                      <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">Document Information</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                        <div className="bg-gray-50 p-3 rounded">
                          <span className="font-medium">Pages:</span> {document.pages}
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <span className="font-medium">Size:</span> {document.size}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
