import React, { useState } from 'react';
import { RefreshCw, Copy, Check, AlertTriangle, Lightbulb } from 'lucide-react';
import { LegalDocument, UserRole } from '../types';

interface ClauseRewriterProps {
  document: LegalDocument;
  userRole: UserRole;
}

export const ClauseRewriter: React.FC<ClauseRewriterProps> = ({ document, userRole }) => {
  const [selectedClause, setSelectedClause] = useState(0);
  const [rewriteStyle, setRewriteStyle] = useState<'simple' | 'balanced' | 'protective'>('simple');
  const [isRewriting, setIsRewriting] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Mock clause data
  const clauses = [
    {
      id: '1',
      title: 'Rent Payment Terms',
      original: 'The Tenant shall pay rent in the amount of $2,500.00 per month, due on the first day of each month. Late payment shall incur a fee of 5% of the monthly rent for each day the payment remains outstanding after the fifth day of the month.',
      riskLevel: 'high',
      issues: ['Excessive late fees', 'No grace period', 'Compound daily penalties']
    },
    {
      id: '2',
      title: 'Security Deposit',
      original: 'Tenant shall deposit with Landlord the sum of $5,000.00 as security for the faithful performance of the terms hereof. Such deposit may be applied to cure any default or to compensate Landlord for damages.',
      riskLevel: 'medium',
      issues: ['Vague terms for deposit use', 'No timeline for return']
    },
    {
      id: '3',
      title: 'Property Maintenance',
      original: 'Tenant agrees to maintain the premises in good condition and shall be responsible for all repairs and maintenance, ordinary and extraordinary.',
      riskLevel: 'high',
      issues: ['Tenant liable for all repairs', 'No landlord responsibilities', 'Unlimited liability']
    }
  ];

  const rewriteOptions = {
    simple: {
      label: 'Plain English',
      description: 'Convert to simple, everyday language',
      color: 'blue'
    },
    balanced: {
      label: 'Fair & Balanced',
      description: 'Make terms more equitable for both parties',
      color: 'green'
    },
    protective: {
      label: 'Tenant Protective',
      description: 'Emphasize tenant rights and protections',
      color: 'purple'
    }
  };

  const generateRewrites = (clause: any, style: string) => {
    const rewrites = {
      '1': {
        simple: 'You must pay $2,500 rent by the 1st of each month. If you\'re late, there\'s a 5-day grace period. After that, you\'ll pay $25 per day in late fees.',
        balanced: 'Monthly rent of $2,500 is due by the 1st of each month. Late payments incur a $50 fee after a 5-day grace period, with no additional daily penalties.',
        protective: 'You pay $2,500 monthly rent by the 1st. You have a 10-day grace period. Late fees are capped at $100 total per month, regardless of how late the payment is.'
      },
      '2': {
        simple: 'You must pay a $5,000 security deposit. The landlord can use this money to fix damages you cause or if you break the lease.',
        balanced: 'You\'ll pay a $5,000 security deposit, refundable within 30 days after move-out. The landlord can deduct costs for damages beyond normal wear and tear.',
        protective: 'You pay a $5,000 refundable security deposit. The landlord must return it within 21 days with an itemized list of any deductions. Only actual damages can be deducted.'
      },
      '3': {
        simple: 'You\'re responsible for keeping the apartment clean and in good condition. You must fix any damage you cause.',
        balanced: 'You maintain the property in good condition and handle minor repairs under $100. The landlord handles major repairs and structural issues.',
        protective: 'You keep the property reasonably clean. The landlord handles all repairs except those caused by your negligence or misuse.'
      }
    };
    
    return rewrites[clause.id as keyof typeof rewrites]?.[style as keyof typeof rewrites['1']] || 'Rewrite not available';
  };

  const handleRewrite = () => {
    setIsRewriting(true);
    setTimeout(() => setIsRewriting(false), 1500);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const currentClause = clauses[selectedClause];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Clause Rewriter</h2>
        <p className="text-lg text-gray-600">
          Transform complex legal language into clear, understandable terms with alternative phrasings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Clause Selection */}
        <div className="lg:col-span-1">
          <h3 className="font-semibold text-gray-900 mb-3">Select Clause</h3>
          <div className="space-y-2">
            {clauses.map((clause, index) => (
              <button
                key={clause.id}
                onClick={() => setSelectedClause(index)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedClause === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{clause.title}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    clause.riskLevel === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {clause.original.substring(0, 60)}...
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Rewrite Style Selection */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Rewrite Style</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(rewriteOptions).map(([key, option]) => (
                <button
                  key={key}
                  onClick={() => setRewriteStyle(key as any)}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    rewriteStyle === key
                      ? `border-${option.color}-500 bg-${option.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-medium text-gray-900 mb-1">{option.label}</h4>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Original vs Rewritten */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Clause */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">{currentClause.title}</h4>
                  <div className={`flex items-center space-x-1 text-sm ${
                    currentClause.riskLevel === 'high' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    <AlertTriangle className="h-4 w-4" />
                    <span>{currentClause.riskLevel.toUpperCase()} RISK</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h5 className="font-medium text-gray-700 mb-3">Original Language</h5>
                <p className="text-gray-800 leading-relaxed mb-4">{currentClause.original}</p>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <h6 className="font-medium text-red-800 mb-2">Identified Issues:</h6>
                  <ul className="text-sm text-red-700 space-y-1">
                    {currentClause.issues.map((issue, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Rewritten Clause */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">Rewritten Version</h4>
                  <button
                    onClick={handleRewrite}
                    disabled={isRewriting}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`h-4 w-4 ${isRewriting ? 'animate-spin' : ''}`} />
                    <span>{isRewriting ? 'Rewriting...' : 'Regenerate'}</span>
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h5 className="font-medium text-gray-700 mb-3">
                  {rewriteOptions[rewriteStyle].label} Version
                </h5>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-800 leading-relaxed">
                    {generateRewrites(currentClause, rewriteStyle)}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-green-700">
                    <Lightbulb className="h-4 w-4" />
                    <span className="text-sm font-medium">Improved clarity and fairness</span>
                  </div>
                  
                  <button
                    onClick={() => handleCopy(generateRewrites(currentClause, rewriteStyle), selectedClause)}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {copiedIndex === selectedClause ? (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Suggestions */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Alternative Phrasings</h3>
            <div className="space-y-4">
              {['simple', 'balanced', 'protective'].filter(style => style !== rewriteStyle).map((style, index) => (
                <div key={style} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {rewriteOptions[style as keyof typeof rewriteOptions].label}
                    </h4>
                    <button
                      onClick={() => handleCopy(generateRewrites(currentClause, style), 100 + index)}
                      className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {copiedIndex === 100 + index ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-gray-700">
                    {generateRewrites(currentClause, style)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};