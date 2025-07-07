
import React, { useState } from 'react';
import { Upload, FileText, MessageSquare, Users, Brain, Zap, BookOpen, Settings, CreditCard, Menu, X } from 'lucide-react';
import DocumentLibrary from '../components/DocumentLibrary';
import DocumentViewer from '../components/DocumentViewer';
import ContactsMessaging from '../components/ContactsMessaging';
import CreditTracker from '../components/CreditTracker';
import BuyCredits from '../components/BuyCredits';
import ProfileSettings from '../components/ProfileSettings';

const Index = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [credits, setCredits] = useState(45);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const deductCredits = (amount) => {
    setCredits(prev => Math.max(0, prev - amount));
  };

  const addCredits = (amount) => {
    setCredits(prev => prev + amount);
  };

  const handleDocumentSelect = (doc) => {
    setSelectedDocument(doc);
    setActiveTab('viewer');
    setMobileMenuOpen(false);
  };

  const handleBackToLibrary = () => {
    setSelectedDocument(null);
    setActiveTab('documents');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/924735e3-573c-4a3b-8b87-c372967db007.png" 
                alt="Logo" 
                className="h-6 w-auto object-contain sm:h-8"
              />
            </div>
            
            {/* Desktop Header Actions */}
            <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
              <button
                onClick={() => setActiveTab('buy-credits')}
                className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs lg:text-sm"
              >
                <CreditCard className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="hidden md:inline">Buy Credits</span>
                <span className="md:hidden">Buy</span>
              </button>
              <CreditTracker credits={credits} />
              <button
                onClick={() => setActiveTab('profile')}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t bg-white py-3 space-y-2">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleTabChange('buy-credits')}
                  className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Buy Credits</span>
                </button>
                <div className="flex items-center justify-between px-3">
                  <CreditTracker credits={credits} />
                  <button
                    onClick={() => handleTabChange('profile')}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b sticky top-14 sm:top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 sm:space-x-8 overflow-x-auto">
            <button
              onClick={() => handleTabChange('documents')}
              className={`flex items-center space-x-2 py-3 sm:py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === 'documents' || activeTab === 'viewer'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Documents</span>
            </button>
            <button
              onClick={() => handleTabChange('contacts')}
              className={`flex items-center space-x-2 py-3 sm:py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
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
        {activeTab === 'buy-credits' && (
          <BuyCredits 
            currentCredits={credits} 
            onCreditsAdded={addCredits}
            onBack={() => setActiveTab('documents')}
          />
        )}
        {activeTab === 'profile' && (
          <ProfileSettings onBack={() => setActiveTab('documents')} />
        )}
      </main>
    </div>
  );
};

export default Index;
