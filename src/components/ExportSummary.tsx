import React, { useState } from 'react';
import { Download, FileText, AlertTriangle, CheckCircle, Info, Share } from 'lucide-react';
import { LegalDocument, UserRole } from '../types';

interface ExportSummaryProps {
  document: LegalDocument;
  userRole: UserRole;
}

export const ExportSummary: React.FC<ExportSummaryProps> = ({ document, userRole }) => {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'docx' | 'html'>('pdf');
  const [includeOriginal, setIncludeOriginal] = useState(true);
  const [includeRisk, setIncludeRisk] = useState(true);
  const [includeRewrites, setIncludeRewrites] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  // Mock summary data
  const summaryData = {
    documentTitle: document.title,
    analysisDate: new Date(),
    userRole,
    riskAssessment: {
      overall: 'medium' as const,
      financialRisk: 'high' as const,
      legalRisk: 'medium' as const,
      operationalRisk: 'low' as const
    },
    keyFindings: [
      'Excessive late fees (5% per day) on rent payments',
      'Large security deposit ($5,000) with vague return terms',
      'Tenant responsible for all maintenance including major repairs',
      'Limited termination options with high penalties'
    ],
    recommendations: [
      'Negotiate lower late fees with a grace period',
      'Clarify security deposit return process and timeline',
      'Define maintenance responsibilities more clearly',
      'Consider adding early termination clause with reasonable fees'
    ],
    clauseSummary: {
      total: 15,
      highRisk: 4,
      mediumRisk: 6,
      lowRisk: 5
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      // In a real app, this would generate and download the file
      const filename = `${document.title.replace(/\s+/g, '_')}_Analysis_${new Date().toISOString().split('T')[0]}.${exportFormat}`;
      console.log(`Exporting ${filename}`);
      setIsExporting(false);
    }, 2000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high': return AlertTriangle;
      case 'medium': return Info;
      case 'low': return CheckCircle;
      default: return Info;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Export Summary</h2>
        <p className="text-lg text-gray-600">
          Generate a comprehensive report with analysis, risk assessment, and simplified rewrites.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export Options */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Export Options</h3>
            
            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Format</label>
              <div className="space-y-2">
                {[
                  { id: 'pdf', label: 'PDF Document', description: 'Best for sharing and printing' },
                  { id: 'docx', label: 'Word Document', description: 'Editable format' },
                  { id: 'html', label: 'Web Page', description: 'Interactive online version' }
                ].map((format) => (
                  <label key={format.id} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value={format.id}
                      checked={exportFormat === format.id}
                      onChange={(e) => setExportFormat(e.target.value as any)}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{format.label}</p>
                      <p className="text-sm text-gray-600">{format.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Content Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Include</label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeOriginal}
                    onChange={(e) => setIncludeOriginal(e.target.checked)}
                  />
                  <span className="text-gray-900">Original document text</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeRisk}
                    onChange={(e) => setIncludeRisk(e.target.checked)}
                  />
                  <span className="text-gray-900">Risk assessment</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeRewrites}
                    onChange={(e) => setIncludeRewrites(e.target.checked)}
                  />
                  <span className="text-gray-900">Plain-English rewrites</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Export Report</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Summary Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Document Analysis Summary</h3>
                  <p className="text-gray-600">{summaryData.documentTitle}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>Analysis Date: {summaryData.analysisDate.toLocaleDateString()}</p>
                  <p>User Role: {userRole}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Risk Assessment */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Risk Assessment</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries({
                    'Overall': summaryData.riskAssessment.overall,
                    'Financial': summaryData.riskAssessment.financialRisk,
                    'Legal': summaryData.riskAssessment.legalRisk,
                    'Operational': summaryData.riskAssessment.operationalRisk
                  }).map(([category, risk]) => {
                    const Icon = getRiskIcon(risk);
                    return (
                      <div key={category} className="text-center">
                        <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2 ${getRiskColor(risk)}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <p className="font-medium text-gray-900">{category}</p>
                        <p className={`text-sm font-medium ${getRiskColor(risk).split(' ')[0]}`}>
                          {risk.toUpperCase()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key Findings */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Key Findings</h4>
                <ul className="space-y-2">
                  {summaryData.keyFindings.map((finding, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Recommendations</h4>
                <ul className="space-y-2">
                  {summaryData.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clause Breakdown */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Clause Analysis</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{summaryData.clauseSummary.total}</p>
                      <p className="text-sm text-gray-600">Total Clauses</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">{summaryData.clauseSummary.highRisk}</p>
                      <p className="text-sm text-gray-600">High Risk</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-600">{summaryData.clauseSummary.mediumRisk}</p>
                      <p className="text-sm text-gray-600">Medium Risk</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{summaryData.clauseSummary.lowRisk}</p>
                      <p className="text-sm text-gray-600">Low Risk</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Share className="h-6 w-6 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Share with Advisor</h3>
              <p className="text-blue-800 text-sm mb-3">
                Send this analysis to your lawyer, financial advisor, or other trusted professional for review.
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Generate Share Link →
              </button>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-start space-x-3">
            <FileText className="h-6 w-6 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Save for Future Reference</h3>
              <p className="text-green-800 text-sm mb-3">
                Keep this analysis for your records and reference it when needed for negotiations or decisions.
              </p>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                Save to Dashboard →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};