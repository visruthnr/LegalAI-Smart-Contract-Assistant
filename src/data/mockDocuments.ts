import { LegalDocument } from '../types';

export const mockDocuments: LegalDocument[] = [
  {
    id: '1',
    title: 'Residential Lease Agreement - Downtown Apartment',
    type: 'lease',
    content: 'This lease agreement is made between...',
    clauses: [],
    riskLevel: 'high',
    uploadDate: new Date('2024-01-10'),
    size: '2.3 MB'
  },
  {
    id: '2',
    title: 'Freelance Web Development Contract',
    type: 'freelance',
    content: 'This service agreement outlines...',
    clauses: [],
    riskLevel: 'medium',
    uploadDate: new Date('2024-01-08'),
    size: '1.8 MB'
  },
  {
    id: '3',
    title: 'SaaS Terms of Service Agreement',
    type: 'terms',
    content: 'These terms govern your use of...',
    clauses: [],
    riskLevel: 'low',
    uploadDate: new Date('2024-01-05'),
    size: '3.1 MB'
  },
  {
    id: '4',
    title: 'Personal Loan Agreement',
    type: 'loan',
    content: 'This loan agreement sets forth...',
    clauses: [],
    riskLevel: 'high',
    uploadDate: new Date('2024-01-12'),
    size: '1.5 MB'
  },
  {
    id: '5',
    title: 'Employment Contract - Tech Startup',
    type: 'employment',
    content: 'This employment agreement between...',
    clauses: [],
    riskLevel: 'medium',
    uploadDate: new Date('2024-01-14'),
    size: '2.7 MB'
  }
];