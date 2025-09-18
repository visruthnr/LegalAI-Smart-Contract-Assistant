import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DocumentUpload } from './components/DocumentUpload';
import { DocumentViewer } from './components/DocumentViewer';
import { ChatInterface } from './components/ChatInterface';
import { ClauseRewriter } from './components/ClauseRewriter';
import { UserProfile } from './components/UserProfile';
import { ScenarioSimulator } from './components/ScenarioSimulator';
import { ExportSummary } from './components/ExportSummary';
import { TechnicalDocs } from './components/TechnicalDocs';
import { LegalDocument, UserRole, ChatMessage } from './types';
import { mockDocuments } from './data/mockDocuments';
import { generateResponse } from './services/aiService';

function App() {
  const [currentView, setCurrentView] = useState<string>('upload');
  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('tenant');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize with welcome message
    setChatMessages([{
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your Legal Document Assistant. Upload a document to get started, or try our demo documents.',
      timestamp: new Date(),
    }]);
  }, []);

  const handleDocumentUpload = (document: LegalDocument) => {
    setSelectedDocument(document);
    setCurrentView('viewer');
    
    // Add confirmation message
    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'ai',
      content: `Document "${document.title}" has been processed successfully. You can now ask questions about specific clauses, request rewrites, or explore scenarios.`,
      timestamp: new Date(),
    }]);
  };

  const handleChatMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await generateResponse(message, selectedDocument, userRole);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date(),
      };

      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar 
          currentView={currentView}
          onViewChange={setCurrentView}
          selectedDocument={selectedDocument}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {currentView === 'upload' && (
              <DocumentUpload 
                onDocumentUpload={handleDocumentUpload}
                mockDocuments={mockDocuments}
              />
            )}
            
            {currentView === 'viewer' && selectedDocument && (
              <DocumentViewer 
                document={selectedDocument}
                userRole={userRole}
              />
            )}
            
            {currentView === 'chat' && (
              <ChatInterface 
                messages={chatMessages}
                onSendMessage={handleChatMessage}
                isLoading={isLoading}
                selectedDocument={selectedDocument}
              />
            )}
            
            {currentView === 'rewriter' && selectedDocument && (
              <ClauseRewriter 
                document={selectedDocument}
                userRole={userRole}
              />
            )}
            
            {currentView === 'profile' && (
              <UserProfile 
                userRole={userRole}
                onRoleChange={setUserRole}
              />
            )}
            
            {currentView === 'scenarios' && selectedDocument && (
              <ScenarioSimulator 
                document={selectedDocument}
                userRole={userRole}
              />
            )}
            
            {currentView === 'export' && selectedDocument && (
              <ExportSummary 
                document={selectedDocument}
                userRole={userRole}
              />
            )}

            {currentView === 'docs' && (
              <TechnicalDocs />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;