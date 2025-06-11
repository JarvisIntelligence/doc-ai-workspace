
import React, { useState } from 'react';
import { Upload, FileText, Calendar, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DocumentLibrary = ({ onDocumentSelect }) => {
  const [documents] = useState([
    {
      id: 1,
      title: "Introduction to Machine Learning",
      type: "PDF",
      uploadDate: "2024-06-10",
      size: "2.4 MB",
      pages: 45,
      summary: "Comprehensive overview of ML algorithms, supervised and unsupervised learning techniques...",
      thumbnail: "📚"
    },
    {
      id: 2,
      title: "History of Ancient Rome",
      type: "DOCX",
      uploadDate: "2024-06-09",
      size: "1.8 MB",
      pages: 32,
      summary: "Detailed study of Roman Empire from 753 BC to 476 AD, covering political structures...",
      thumbnail: "🏛️"
    },
    {
      id: 3,
      title: "Organic Chemistry Reactions",
      type: "PDF",
      uploadDate: "2024-06-08",
      size: "3.2 MB",
      pages: 67,
      summary: "Complete guide to organic chemistry reactions, mechanisms, and synthesis pathways...",
      thumbnail: "🧪"
    },
    {
      id: 4,
      title: "Financial Markets Analysis",
      type: "PDF",
      uploadDate: "2024-06-07",
      size: "1.9 MB",
      pages: 28,
      summary: "Analysis of global financial markets, trading strategies, and risk management...",
      thumbnail: "📈"
    }
  ]);

  const handleUpload = () => {
    // In a real app, this would open a file picker
    alert("Upload functionality would open a file picker here. For this demo, we're showing pre-loaded documents.");
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Documents</h3>
          <p className="text-gray-600 mb-4">Drop your PDF or DOCX files here, or click to browse</p>
          <Button onClick={handleUpload} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Upload className="w-4 h-4 mr-2" />
            Choose Files
          </Button>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onDocumentSelect(doc)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{doc.thumbnail}</div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {doc.type}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {doc.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {doc.summary}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{doc.pages} pages</span>
                <span>{doc.size}</span>
              </div>
              
              <div className="flex items-center mt-3 text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(doc.uploadDate).toLocaleDateString()}
              </div>
            </div>
            
            <div className="border-t px-6 py-3 bg-gray-50 flex items-center justify-between">
              <span className="text-sm text-gray-600">Click to open</span>
              <Eye className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentLibrary;
