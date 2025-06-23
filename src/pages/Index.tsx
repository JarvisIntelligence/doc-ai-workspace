
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-primary">
                JARVIS
              </h1>
            </div>
            <CreditTracker credits={credits} />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('documents')}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'documents' || activeTab === 'viewer'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Documents</span>
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'contacts'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
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
