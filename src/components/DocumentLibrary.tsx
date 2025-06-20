
import React, { useState } from 'react';
import { Upload, FileText, Calendar, Eye, Download, X, CheckCircle } from 'lucide-react';
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

  const [isDragOver, setIsDragOver] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const validFiles = files.filter(file => 
      file.type === 'application/pdf' || 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.name.endsWith('.pdf') || 
      file.name.endsWith('.docx')
    );
    
    setSelectedFiles(validFiles);
    
    // Simulate upload progress
    validFiles.forEach((file, index) => {
      simulateUpload(file.name);
    });
  };

  const simulateUpload = (fileName) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(prev => ({ ...prev, [fileName]: Math.min(progress, 100) }));
    }, 300);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
    setShowUploadModal(true);
  };

  const removeFile = (fileName) => {
    setSelectedFiles(prev => prev.filter(file => file.name !== fileName));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div 
        className={`bg-white rounded-lg shadow-sm border-2 border-dashed p-8 transition-all ${
          isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${
            isDragOver ? 'bg-blue-200' : 'bg-blue-100'
          }`}>
            <Upload className={`w-8 h-8 transition-colors ${
              isDragOver ? 'text-blue-700' : 'text-blue-600'
            }`} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Documents</h3>
          <p className="text-gray-600 mb-4">
            {isDragOver 
              ? 'Drop your files here!' 
              : 'Drop your PDF or DOCX files here, or click to browse'
            }
          </p>
          <input
            type="file"
            multiple
            accept=".pdf,.docx"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <Button 
            onClick={() => document.getElementById('file-upload').click()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose Files
          </Button>
          <p className="text-xs text-gray-500 mt-2">Supports PDF and DOCX files up to 10MB</p>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">Upload Files</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {selectedFiles.length === 0 ? (
                <div className="text-center py-8">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No files selected</p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="modal-file-upload"
                  />
                  <Button 
                    onClick={() => document.getElementById('modal-file-upload').click()}
                    className="mt-4"
                    variant="outline"
                  >
                    Select Files
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedFiles.map((file) => (
                    <div key={file.name} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {uploadProgress[file.name] === 100 ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <button
                              onClick={() => removeFile(file.name)}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {uploadProgress[file.name] !== undefined && (
                        <div className="space-y-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress[file.name] || 0}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-600">
                            {uploadProgress[file.name] === 100 
                              ? 'Upload complete!' 
                              : `Uploading... ${Math.round(uploadProgress[file.name] || 0)}%`
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="flex space-x-3 pt-4">
                    <Button 
                      onClick={() => setShowUploadModal(false)}
                      variant="outline" 
                      className="flex-1"
                    >
                      Close
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={Object.values(uploadProgress).some(progress => progress < 100)}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
