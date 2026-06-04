/**
 * Types & Interfaces for the Information Theory & Business Steering App
 */

export interface EdstackConnection {
  id: string;
  title: string;
  officialGoal: string;
  shannonConcept: string;
  analogy: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  edstackId: string;
}

export interface SimulationState {
  probabilities: number[];
  bandwidth: number;
  signalStrength: number;
  noiseLevel: number;
  redundancyScheme: 'none' | 'parity' | 'hamming';
  transactionFrequency: number;
  complexityLevel: number;
}
