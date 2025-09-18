export interface LegalDocument {
  id: string;
  title: string;
  type: 'lease' | 'freelance' | 'terms' | 'loan' | 'employment';
  content: string;
  clauses: Clause[];
  riskLevel: 'low' | 'medium' | 'high';
  uploadDate: Date;
  size?: string;
}

export interface Clause {
  id: string;
  title: string;
  originalText: string;
  simplifiedText: string;
  riskLevel: 'low' | 'medium' | 'high';
  relevantToRoles: UserRole[];
  section: string;
  alternatives?: string[];
  citations?: string[];
}

export interface UserRole {
  type: 'tenant' | 'freelancer' | 'startup' | 'employee' | 'consumer';
  experience: 'beginner' | 'intermediate' | 'expert';
  priorities: string[];
}

export type UserRole = 'tenant' | 'freelancer' | 'startup' | 'employee' | 'consumer';

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  citations?: string[];
  clauseId?: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  applicableRoles: UserRole[];
  dialogue: DialogueStep[];
  outcome: string;
}

export interface DialogueStep {
  speaker: string;
  message: string;
  type: 'user' | 'landlord' | 'employer' | 'client';
}

export interface RiskAssessment {
  overall: 'low' | 'medium' | 'high';
  categories: {
    financial: 'low' | 'medium' | 'high';
    legal: 'low' | 'medium' | 'high';
    operational: 'low' | 'medium' | 'high';
  };
  flaggedClauses: string[];
  recommendations: string[];
}