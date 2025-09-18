import React, { useState } from 'react';
import { Eye, EyeOff, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { LegalDocument, UserRole, Clause } from '../types';

interface DocumentViewerProps {
  document: LegalDocument;
  userRole: UserRole;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ document, userRole }) => {
  const [showSimplified, setShowSimplified] = useState(false);
  const [selectedClause, setSelectedClause] = useState<Clause | null>(null);
  const [filterByRole, setFilterByRole] = useState(false);

  // Mock clauses for demonstration
  const clauses: Clause[] = [
    {
      id: '1',
      title: 'Rent Payment Terms',
      originalText: 'The Tenant shall pay rent in the amount of $2,500.00 per month, due on the first day of each month. Late payment shall incur a fee of 5% of the monthly rent for each day the payment remains outstanding after the fifth day of the month.',
      simplifiedText: 'You must pay $2,500 rent by the 1st of each month. If you\'re more than 5 days late, you\'ll pay an extra 5% per day (that\'s $125 per day).',
      riskLevel: 'high',
      relevantToRoles: ['tenant'],
      section: 'Payment Terms',
      alternatives: [
        'You must pay $2,500 rent by the 1st of each month. Late fees start after a 5-day grace period at $25 per day.',
        'Monthly rent of $2,500 is due by the 1st. Late fees are capped at $100 total after 5 days.'
      ]
    },
    {
      id: '2',
      title: 'Security Deposit',
      originalText: 'Tenant shall deposit with Landlord the sum of $5,000.00 as security for the faithful performance of the terms hereof. Such deposit may be applied to cure any default or to compensate Landlord for damages.',
      simplifiedText: 'You must pay a $5,000 security deposit. The landlord can use this money if you break the lease or damage the property.',
      riskLevel: 'medium',
      relevantToRoles: ['tenant'],
      section: 'Financial Terms'
    },
    {
      id: '3',
      title: 'Termination Notice',
      originalText: 'This Agreement may be terminated by either party upon sixty (60) days written notice to the other party, provided that such termination shall not relieve either party of obligations accrued prior to such termination.',
      simplifiedText: 'Either you or the landlord can end this lease by giving 60 days written notice. You\'ll still owe any money due before the termination date.',
      riskLevel: 'low',
      relevantToRoles: ['tenant'],
      section: 'Termination'
    }
  ];

  const filteredClauses = filterByRole 
    ? clauses.filter(clause => clause.relevantToRoles.includes(userRole))
    : clauses;

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'medium': return <Info className="h-4 w-4 text-yellow-600" />;
      default: return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-green-500 bg-green-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{document.title}</h2>
          <p className="text-gray-600 mt-1">
            Document Type: {document.type.charAt(0).toUpperCase() + document.type.slice(1)} Agreement
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setFilterByRole(!filterByRole)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterByRole 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Filter by Role: {userRole}
          </button>
          
          <button
            onClick={() => setShowSimplified(!showSimplified)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              showSimplified 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {showSimplified ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{showSimplified ? 'Show Original' : 'Show Simplified'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Clauses */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Document Clauses</h3>
          
          {filteredClauses.map((clause) => (
            <div 
              key={clause.id}
              className={`border-l-4 p-4 rounded-r-lg cursor-pointer transition-colors ${
                getRiskColor(clause.riskLevel)
              } ${selectedClause?.id === clause.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedClause(clause)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{clause.title}</h4>
                <div className="flex items-center space-x-2">
                  {getRiskIcon(clause.riskLevel)}
                  <span className="text-sm font-medium text-gray-600">
                    {clause.riskLevel} risk
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{clause.section}</p>
              
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-800">
                  {showSimplified ? clause.simplifiedText : clause.originalText}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Clause Details Panel */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 h-fit">
          {selectedClause ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Clause Analysis</h3>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{selectedClause.title}</h4>
                <div className={`flex items-center space-x-2 mb-3 ${
                  selectedClause.riskLevel === 'high' ? 'text-red-600' :
                  selectedClause.riskLevel === 'medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {getRiskIcon(selectedClause.riskLevel)}
                  <span className="font-medium">{selectedClause.riskLevel.toUpperCase()} Risk</span>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Original Text</h5>
                <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
                  {selectedClause.originalText}
                </p>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Plain English</h5>
                <p className="text-sm text-gray-700 p-3 bg-blue-50 rounded-lg">
                  {selectedClause.simplifiedText}
                </p>
              </div>

              {selectedClause.alternatives && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Alternative Phrasings</h5>
                  {selectedClause.alternatives.map((alt, index) => (
                    <div key={index} className="text-sm text-gray-700 p-3 bg-green-50 rounded-lg mb-2">
                      <p className="font-medium text-green-800 mb-1">Option {index + 1}:</p>
                      <p>{alt}</p>
                    </div>
                  ))}
                </div>
              )}

              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Rewrite This Clause
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Click on a clause to view detailed analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};