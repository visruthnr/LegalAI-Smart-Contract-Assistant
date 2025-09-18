import React from 'react';
import { 
  Upload, 
  FileText, 
  MessageCircle, 
  Edit3, 
  User, 
  Play, 
  Download,
  BookOpen
} from 'lucide-react';
import { LegalDocument } from '../types';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  selectedDocument: LegalDocument | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onViewChange, 
  selectedDocument 
}) => {
  const menuItems = [
    { id: 'upload', label: 'Upload Document', icon: Upload, enabled: true },
    { id: 'viewer', label: 'Document Viewer', icon: FileText, enabled: !!selectedDocument },
    { id: 'chat', label: 'Legal Twin Chat', icon: MessageCircle, enabled: true },
    { id: 'rewriter', label: 'Clause Rewriter', icon: Edit3, enabled: !!selectedDocument },
    { id: 'profile', label: 'User Profile', icon: User, enabled: true },
    { id: 'scenarios', label: 'Scenario Simulation', icon: Play, enabled: !!selectedDocument },
    { id: 'export', label: 'Export Summary', icon: Download, enabled: !!selectedDocument },
    { id: 'docs', label: 'Technical Docs', icon: BookOpen, enabled: true },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            const isEnabled = item.enabled;
            
            return (
              <button
                key={item.id}
                onClick={() => isEnabled && onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : isEnabled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
                disabled={!isEnabled}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {selectedDocument && (
          <div className="mt-6 p-3 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Active Document</h3>
            <p className="text-sm text-gray-600">{selectedDocument.title}</p>
            <div className={`inline-flex items-center mt-2 px-2 py-1 rounded-full text-xs font-medium ${
              selectedDocument.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
              selectedDocument.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              Risk: {selectedDocument.riskLevel.toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};