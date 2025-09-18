import React, { useState } from 'react';
import { Book, Code, Cloud, Shield, Zap, Database, ArrowRight } from 'lucide-react';

export const TechnicalDocs: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'System Overview', icon: Book },
    { id: 'architecture', title: 'Architecture', icon: Code },
    { id: 'apis', title: 'API Specifications', icon: Zap },
    { id: 'security', title: 'Security & Privacy', icon: Shield },
    { id: 'deployment', title: 'Deployment', icon: Cloud },
    { id: 'database', title: 'Database Design', icon: Database }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">System Overview</h2>
              <p className="text-gray-600 mb-6">
                LegalAI Clarity is a comprehensive Generative AI solution that transforms complex legal documents 
                into accessible, plain-language guidance. The system provides conversational Q&A, clause rewriting, 
                personalized filtering, and scenario simulation capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Core Features</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Document upload and processing (PDF/DOCX)</li>
                  <li>• Conversational Legal Twin with natural language Q&A</li>
                  <li>• Clause Rewriting Engine with alternative phrasings</li>
                  <li>• Personalized filtering based on user roles</li>
                  <li>• Scenario simulation with realistic dialogues</li>
                  <li>• Risk assessment and exportable summaries</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Technology Stack</h3>
                <ul className="space-y-2 text-green-800">
                  <li>• <strong>Frontend:</strong> React + TypeScript + Tailwind CSS</li>
                  <li>• <strong>Backend:</strong> Python + FastAPI</li>
                  <li>• <strong>AI/ML:</strong> Google Gemini Pro via Vertex AI</li>
                  <li>• <strong>Document Processing:</strong> Google Cloud Document AI</li>
                  <li>• <strong>Infrastructure:</strong> Google Cloud Platform</li>
                  <li>• <strong>Security:</strong> IAM, DLP, encryption at rest/transit</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'architecture':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">System Architecture</h2>
              <p className="text-gray-600 mb-6">
                The system follows a microservices architecture deployed on Google Cloud Platform with 
                clear separation of concerns and scalable design patterns.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Architecture Diagram</h3>
              <div className="bg-white p-8 rounded-lg border border-gray-300">
                <div className="text-center space-y-4">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Frontend (React)</h4>
                    <p className="text-sm text-blue-700">User Interface, Document Upload, Chat Interface</p>
                  </div>
                  
                  <ArrowRight className="mx-auto h-6 w-6 text-gray-400" />
                  
                  <div className="bg-green-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900">API Gateway</h4>
                    <p className="text-sm text-green-700">Authentication, Rate Limiting, Load Balancing</p>
                  </div>
                  
                  <ArrowRight className="mx-auto h-6 w-6 text-gray-400" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-purple-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900">Document Service</h4>
                      <p className="text-sm text-purple-700">Processing, Storage, OCR</p>
                    </div>
                    
                    <div className="bg-orange-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-900">AI Service</h4>
                      <p className="text-sm text-orange-700">Gemini Pro, Analysis, Q&A</p>
                    </div>
                    
                    <div className="bg-pink-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-pink-900">User Service</h4>
                      <p className="text-sm text-pink-700">Profiles, Preferences, History</p>
                    </div>
                  </div>
                  
                  <ArrowRight className="mx-auto h-6 w-6 text-gray-400" />
                  
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Data Layer</h4>
                    <p className="text-sm text-gray-700">Cloud SQL, Cloud Storage, Redis Cache</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Component Responsibilities</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-800">Frontend Layer</h4>
                    <p className="text-sm text-gray-600">React-based SPA with responsive design, document viewer, chat interface, and export functionality.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">API Gateway</h4>
                    <p className="text-sm text-gray-600">Cloud Endpoints handling authentication, rate limiting, and request routing to microservices.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Microservices</h4>
                    <p className="text-sm text-gray-600">Containerized services for document processing, AI analysis, and user management.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Flow</h3>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li>1. User uploads document through React frontend</li>
                  <li>2. Document processed by Cloud Document AI</li>
                  <li>3. Extracted text sent to Gemini Pro for analysis</li>
                  <li>4. Clauses identified and risk-assessed</li>
                  <li>5. Results stored in Cloud SQL with metadata</li>
                  <li>6. User interacts through chat interface</li>
                  <li>7. AI responses generated and cached</li>
                </ol>
              </div>
            </div>
          </div>
        );

      case 'apis':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">API Specifications</h2>
              <p className="text-gray-600 mb-6">
                RESTful APIs built with FastAPI providing endpoints for document processing, 
                AI analysis, and user interactions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Endpoints</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-mono text-sm bg-blue-50 px-2 py-1 rounded">POST /api/v1/documents/upload</h4>
                    <p className="text-sm text-gray-600 mt-1">Upload and process legal documents</p>
                    <div className="mt-2 text-xs text-gray-500">
                      <p><strong>Body:</strong> multipart/form-data</p>
                      <p><strong>Response:</strong> Document metadata + processing status</p>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-mono text-sm bg-green-50 px-2 py-1 rounded">GET /api/v1/documents/{id}</h4>
                    <p className="text-sm text-gray-600 mt-1">Retrieve document details and clauses</p>
                    <div className="mt-2 text-xs text-gray-500">
                      <p><strong>Response:</strong> Full document analysis</p>
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-mono text-sm bg-purple-50 px-2 py-1 rounded">GET /api/v1/documents/{id}/clauses</h4>
                    <p className="text-sm text-gray-600 mt-1">Get analyzed clauses with risk assessment</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Analysis Endpoints</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-mono text-sm bg-orange-50 px-2 py-1 rounded">POST /api/v1/ai/chat</h4>
                    <p className="text-sm text-gray-600 mt-1">Send questions to Legal Twin AI</p>
 <div className="mt-2 text-xs text-gray-500">
  <p><strong>Body:</strong></p>
  <pre className="bg-gray-100 p-2 rounded">
    {`{
  "message": "string",
  "document_id": "string"
}`}
  </pre>
</div>

                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-mono text-sm bg-red-50 px-2 py-1 rounded">POST /api/v1/ai/rewrite</h4>
                    <p className="text-sm text-gray-600 mt-1">Generate plain-English clause rewrites</p>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-4">
                    <h4 className="font-mono text-sm bg-indigo-50 px-2 py-1 rounded">POST /api/v1/ai/simulate</h4>
                    <p className="text-sm text-gray-600 mt-1">Run scenario simulations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample API Response</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "document_id": "doc_123456",
  "title": "Residential Lease Agreement",
  "status": "processed",
  "risk_assessment": {
    "overall": "medium",
    "financial": "high",
    "legal": "medium"
  },
  "clauses": [
    {
      "id": "clause_1",
      "title": "Rent Payment Terms",
      "original_text": "The Tenant shall pay...",
      "simplified_text": "You must pay $2,500...",
      "risk_level": "high",
      "issues": ["Excessive late fees"],
      "alternatives": ["Monthly rent of $2,500..."]
    }
  ],
  "metadata": {
    "processed_at": "2024-01-15T10:30:00Z",
    "processing_time": "2.3s",
    "page_count": 12
  }
}`}
              </pre>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Security & Privacy</h2>
              <p className="text-gray-600 mb-6">
                Comprehensive security measures to protect user data and ensure compliance with 
                privacy regulations including GDPR and CCPA.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold text-red-900 mb-4">Data Protection</h3>
                <ul className="space-y-3 text-red-800">
                  <li className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span><strong>Encryption:</strong> AES-256 encryption at rest, TLS 1.3 in transit</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span><strong>Access Control:</strong> IAM with principle of least privilege</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span><strong>Data Loss Prevention:</strong> Google Cloud DLP for sensitive data detection</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span><strong>Audit Logging:</strong> Complete audit trail for all data access</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Authentication & Authorization</h3>
                <ul className="space-y-3 text-blue-800">
                  <li>• OAuth 2.0 / OpenID Connect integration</li>
                  <li>• Multi-factor authentication (MFA) required</li>
                  <li>• JWT tokens with short expiration times</li>
                  <li>• Role-based access control (RBAC)</li>
                  <li>• API rate limiting and DDoS protection</li>
                  <li>• Session management and secure logout</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Compliance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Data Minimization</h4>
                  <p className="text-sm text-gray-600">Only collect and process data necessary for service functionality.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">User Rights</h4>
                  <p className="text-sm text-gray-600">Data portability, right to deletion, access requests, and consent management.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Retention Policies</h4>
                  <p className="text-sm text-gray-600">Automatic data deletion after specified periods, configurable by user.</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Security Monitoring</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">Real-time Monitoring</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Intrusion detection system (IDS)</li>
                    <li>• Anomaly detection for user behavior</li>
                    <li>• Automated security alerts</li>
                    <li>• Vulnerability scanning</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">Compliance</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• SOC 2 Type II certification</li>
                    <li>• GDPR and CCPA compliance</li>
                    <li>• Regular security audits</li>
                    <li>• Penetration testing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'deployment':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Deployment Architecture</h2>
              <p className="text-gray-600 mb-6">
                Cloud-native deployment on Google Cloud Platform with auto-scaling, 
                high availability, and disaster recovery capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Infrastructure Components</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Cloud className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-800">Google Kubernetes Engine (GKE)</h4>
                      <p className="text-sm text-gray-600">Containerized microservices with auto-scaling</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Database className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-800">Cloud SQL + Cloud Storage</h4>
                      <p className="text-sm text-gray-600">Managed database and object storage</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Zap className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-800">Cloud CDN + Load Balancer</h4>
                      <p className="text-sm text-gray-600">Global content delivery and load distribution</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Deployment Pipeline</h3>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium">1</div>
                    <span>Code commit triggers Cloud Build pipeline</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium">2</div>
                    <span>Automated testing (unit, integration, e2e)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium">3</div>
                    <span>Container image build and push to Artifact Registry</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium">4</div>
                    <span>Deploy to staging environment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium">5</div>
                    <span>Automated acceptance tests</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium">6</div>
                    <span>Blue-green deployment to production</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Scaling & Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-green-800 mb-2">Horizontal Pod Autoscaling</h4>
                  <p className="text-sm text-green-700">Automatic scaling based on CPU, memory, and custom metrics</p>
                </div>
                <div>
                  <h4 className="font-medium text-green-800 mb-2">Database Scaling</h4>
                  <p className="text-sm text-green-700">Read replicas, connection pooling, and query optimization</p>
                </div>
                <div>
                  <h4 className="font-medium text-green-800 mb-2">Caching Strategy</h4>
                  <p className="text-sm text-green-700">Redis for session data, CDN for static assets</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monitoring & Alerting</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Application Monitoring</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Google Cloud Monitoring for metrics</li>
                    <li>• Cloud Logging for centralized logs</li>
                    <li>• Error Reporting for exception tracking</li>
                    <li>• APM for performance insights</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Infrastructure Monitoring</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Kubernetes cluster health monitoring</li>
                    <li>• Database performance metrics</li>
                    <li>• Network and security monitoring</li>
                    <li>• Cost optimization tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'database':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Database Design</h2>
              <p className="text-gray-600 mb-6">
                Scalable database schema designed for legal document analysis with efficient 
                querying and data integrity constraints.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Entity Relationship Diagram</h3>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Users</h4>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• id (UUID, PK)</li>
                      <li>• email (VARCHAR)</li>
                      <li>• role (ENUM)</li>
                      <li>• preferences (JSON)</li>
                      <li>• created_at (TIMESTAMP)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Documents</h4>
                    <ul className="text-xs text-green-800 space-y-1">
                      <li>• id (UUID, PK)</li>
                      <li>• user_id (UUID, FK)</li>
                      <li>• title (VARCHAR)</li>
                      <li>• type (ENUM)</li>
                      <li>• content (TEXT)</li>
                      <li>• risk_level (ENUM)</li>
                      <li>• uploaded_at (TIMESTAMP)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Clauses</h4>
                    <ul className="text-xs text-purple-800 space-y-1">
                      <li>• id (UUID, PK)</li>
                      <li>• document_id (UUID, FK)</li>
                      <li>• title (VARCHAR)</li>
                      <li>• original_text (TEXT)</li>
                      <li>• simplified_text (TEXT)</li>
                      <li>• risk_level (ENUM)</li>
                      <li>• section (VARCHAR)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Chat_Messages</h4>
                    <ul className="text-xs text-orange-800 space-y-1">
                      <li>• id (UUID, PK)</li>
                      <li>• user_id (UUID, FK)</li>
                      <li>• document_id (UUID, FK)</li>
                      <li>• message (TEXT)</li>
                      <li>• response (TEXT)</li>
                      <li>• timestamp (TIMESTAMP)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-pink-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-pink-900 mb-2">Risk_Assessments</h4>
                    <ul className="text-xs text-pink-800 space-y-1">
                      <li>• id (UUID, PK)</li>
                      <li>• document_id (UUID, FK)</li>
                      <li>• overall_risk (ENUM)</li>
                      <li>• financial_risk (ENUM)</li>
                      <li>• legal_risk (ENUM)</li>
                      <li>• recommendations (JSON)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-indigo-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-900 mb-2">Scenarios</h4>
                    <ul className="text-xs text-indigo-800 space-y-1">
                      <li>• id (UUID, PK)</li>
                      <li>• document_id (UUID, FK)</li>
                      <li>• title (VARCHAR)</li>
                      <li>• description (TEXT)</li>
                      <li>• dialogue (JSON)</li>
                      <li>• outcome (TEXT)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Indexing Strategy</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-800">Primary Indexes</h4>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• documents(user_id, uploaded_at)</li>
                      <li>• clauses(document_id, risk_level)</li>
                      <li>• chat_messages(user_id, timestamp)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800">Full-Text Search</h4>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• GIN index on document content</li>
                      <li>• Full-text search on clause text</li>
                      <li>• Vector similarity for semantic search</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Partitioning</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-800">Time-based Partitioning</h4>
                    <p className="text-sm text-gray-600">Documents and chat messages partitioned by month for efficient archival</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800">Sharding Strategy</h4>
                    <p className="text-sm text-gray-600">User-based sharding for horizontal scaling with consistent hashing</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample SQL Schema</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role user_role_enum NOT NULL DEFAULT 'tenant',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  type document_type_enum NOT NULL,
  content TEXT NOT NULL,
  risk_level risk_level_enum DEFAULT 'medium',
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_documents_user_uploaded (user_id, uploaded_at),
  INDEX idx_documents_type_risk (type, risk_level)
);

CREATE TABLE clauses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  original_text TEXT NOT NULL,
  simplified_text TEXT,
  risk_level risk_level_enum DEFAULT 'medium',
  section VARCHAR(100),
  alternatives JSONB DEFAULT '[]',
  
  INDEX idx_clauses_document_risk (document_id, risk_level)
);`}
              </pre>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Technical Documentation</h2>
        <p className="text-lg text-gray-600">
          Comprehensive technical architecture and implementation details for the LegalAI Clarity platform.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Navigation */}
        <div className="lg:w-64 bg-white rounded-lg border border-gray-200 p-4">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{section.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};