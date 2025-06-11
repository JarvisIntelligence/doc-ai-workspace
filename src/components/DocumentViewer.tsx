
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
      <div className="border-b bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{document.thumbnail}</div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{document.title}</h1>
                <p className="text-sm text-gray-600">{document.pages} pages • {document.size}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-300px)]">
        {/* Document Preview */}
        <div className="w-1/2 border-r bg-gray-50 p-6 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 min-h-full">
            <div className="text-center mb-8">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Document Preview</h3>
              <p className="text-gray-600">In a real app, this would show the actual document content</p>
            </div>
            
            {/* Mock document content */}
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{document.title}</h2>
              <p>This is a preview of the document content. In the actual implementation, this would display the real PDF or DOCX content using a document viewer library.</p>
              <p>The document covers various topics and concepts that students can interact with using the AI features on the right side of the screen.</p>
              <p>Students can generate summaries, create quizzes, and ask specific questions about the content to enhance their learning experience.</p>
              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <h3 className="font-semibold text-blue-900 mb-2">Key Features Available:</h3>
                <ul className="list-disc list-inside text-blue-800 space-y-1">
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
        <div className="w-1/2 flex flex-col">
          {/* Tabs */}
          <div className="border-b bg-white">
            <div className="flex">
              <button
                onClick={() => setActiveTab('summary')}
                className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'summary'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span>Summary</span>
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'quiz'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Quiz</span>
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'chat'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
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
