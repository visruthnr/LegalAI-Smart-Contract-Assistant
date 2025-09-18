import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { LegalDocument } from '../types';

interface DocumentUploadProps {
  onDocumentUpload: (document: LegalDocument) => void;
  mockDocuments: LegalDocument[];
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ 
  onDocumentUpload, 
  mockDocuments 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    
    // Simulate document processing
    setTimeout(() => {
      const mockDocument: LegalDocument = {
        id: Date.now().toString(),
        title: file.name,
        type: 'lease',
        content: 'Processed document content...',
        clauses: [],
        riskLevel: 'medium',
        uploadDate: new Date(),
        size: `${(file.size / 1024).toFixed(1)} KB`
      };
      
      onDocumentUpload(mockDocument);
      setIsProcessing(false);
    }, 2000);
  };

  const handleMockDocumentSelect = (document: LegalDocument) => {
    setIsProcessing(true);
    setTimeout(() => {
      onDocumentUpload(document);
      setIsProcessing(false);
    }, 1000);
  };

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Processing Document</h3>
          <p className="text-gray-600">Using Google Cloud Document AI to extract and analyze clauses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Upload Legal Document</h2>
        <p className="text-lg text-gray-600">
          Upload your legal document to get started with AI-powered analysis and plain-English explanations.
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          Drop your document here, or click to browse
        </h3>
        <p className="text-gray-500 mb-6">
          Supports PDF, DOCX files up to 10MB
        </p>
        
        <input
          type="file"
          accept=".pdf,.docx,.doc"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Choose File
        </button>
      </div>

      {/* Demo Documents */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Try Demo Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockDocuments.map((doc) => (
            <div 
              key={doc.id}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors"
              onClick={() => handleMockDocumentSelect(doc)}
            >
              <div className="flex items-start justify-between mb-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  doc.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                  doc.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {doc.riskLevel} risk
                </div>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-2">{doc.title}</h4>
              <p className="text-sm text-gray-600 mb-3">
                {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)} Agreement
              </p>
              
              <button className="w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Analyze Document
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Features Preview */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What you'll get:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Plain-English Translation</h4>
              <p className="text-sm text-gray-600">Every clause rewritten in simple terms</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Risk Assessment</h4>
              <p className="text-sm text-gray-600">Identify potential issues and red flags</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Interactive Q&A</h4>
              <p className="text-sm text-gray-600">Ask questions about specific clauses</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Scenario Simulation</h4>
              <p className="text-sm text-gray-600">Explore "what if" situations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};