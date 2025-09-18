import React from 'react';
import { Scale, Brain } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Scale className="h-8 w-8 text-blue-600" />
            <Brain className="h-4 w-4 text-blue-400 absolute -top-1 -right-1" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">LegalAI Clarity</h1>
            <p className="text-sm text-gray-600">Demystifying Legal Documents with AI</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-blue-50 px-3 py-2 rounded-lg">
            <p className="text-sm font-medium text-blue-700">MVP Demo</p>
            <p className="text-xs text-blue-600">Powered by Gemini Pro</p>
          </div>
        </div>
      </div>
    </header>
  );
};