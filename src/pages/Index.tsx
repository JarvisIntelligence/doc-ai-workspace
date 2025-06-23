
import React, { useState } from 'react';
import { Upload, FileText, MessageSquare, Users, Brain, Zap, BookOpen } from 'lucide-react';
import DocumentLibrary from '../components/DocumentLibrary';
import DocumentViewer from '../components/DocumentViewer';
import ContactsMessaging from '../components/ContactsMessaging';
import CreditTracker from '../components/CreditTracker';

const Index = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [credits, setCredits] = useState(45);

  const deductCredits = (amount) => {
    setCredits(prev => Math.max(0, prev - amount));
  };

  const handleDocumentSelect = (doc) => {
    setSelectedDocument(doc);
    setActiveTab('viewer');
  };

  const handleBackToLibrary = () => {
    setSelectedDocument(null);
    setActiveTab('documents');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/924735e3-573c-4a3b-8b87-c372967db007.png" 
                alt="Jarvis Logo" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <CreditTracker credits={credits} />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('documents')}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'documents' || activeTab === 'viewer'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Documents</span>
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'contacts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Contacts</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'documents' && (
          <DocumentLibrary onDocumentSelect={handleDocumentSelect} />
        )}
        {activeTab === 'viewer' && selectedDocument && (
          <DocumentViewer 
            document={selectedDocument} 
            onBack={handleBackToLibrary}
            credits={credits}
            onDeductCredits={deductCredits}
          />
        )}
        {activeTab === 'contacts' && (
          <ContactsMessaging />
        )}
      </main>
    </div>
  );
};

export default Index;
