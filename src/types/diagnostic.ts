export type BucketKey =
  | 'speedToLead'
  | 'qualification'
  | 'noShow'
  | 'followUp'
  | 'briefing'
  | 'crmControl'
  | 'control';

export type RiskLevel = 'controlled' | 'moderate' | 'high' | 'critical';

export type ConcernKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface DiagnosticAnswers {
  q1?: 'A' | 'B' | 'C' | 'D';
  q2?: 'A' | 'B' | 'C' | 'D' | 'E';
  q3?: 'A' | 'B' | 'C' | 'D';
  q4?: string[];
  q5?: 'A' | 'B' | 'C' | 'D';
  q6?: 'A' | 'B' | 'C' | 'D';
  q7?: string[];
  q8?: 'A' | 'B' | 'C' | 'D';
  q9?: number;
  q10?: 'A' | 'B' | 'C' | 'D';
  q11?: 'A' | 'B' | 'C' | 'D';
  q12?: 'A' | 'B' | 'C' | 'D';
  q13?: 'A' | 'B' | 'C' | 'D';
  q14?: 'A' | 'B' | 'C' | 'D';
  q15?: 'A' | 'B' | 'C' | 'D';
  q16?: 'A' | 'B' | 'C' | 'D';
  q17?: string[];
  q18?: number;
  q19?: ConcernKey;
}

export interface BucketResult {
  key: BucketKey;
  label: string;
  score: number;
  max: number;
  percentage: number;
  level: RiskLevel;
}

export interface DiagnosticResult {
  bucketScores: Record<BucketKey, BucketResult>;
  totalRisk: number;
  maxPossibleRisk: number;
  riskPercentage: number;
  overallScore: number;
  primaryLeak: BucketKey;
  automationReadinessShare: number;
  selectedAutomationAreas: string[];
  mainConcern: ConcernKey | undefined;
  automationTier: 'selective' | 'partial' | 'relevant' | 'broad';
}

export interface LeadUserData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  monthlyLeads?: string;
}

export interface DiagnosticSummary {
  userData: LeadUserData;
  overallScore: number;
  primaryLeak: BucketKey;
  bucketScores: Record<BucketKey, BucketResult>;
  automationReadinessShare: number;
  selectedAutomationAreas: string[];
  mainConcern: ConcernKey | undefined;
  recommendation: string;
  disclaimer: string;
}
