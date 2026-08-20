export interface VariableInfo {
  name: string;
  role: string;
  initialValue: string;
}

export interface TraceStep {
  stepNum: number;
  iteration: string;
  description: string;
  varStates: string;
  conditionResult?: string;
}

export interface Quiz {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface FlowchartResult {
  algorithmTitle: string;
  mermaid: string;
  problemSummary: string;
  variables: VariableInfo[];
  traceSteps: TraceStep[];
  finalOutput: string;
  mathConcept: string;
  quiz: Quiz;
}

export interface StudentReflectionData {
  studentName: string;
  studentId: string;
  date: string;
  hypothesis: string;
  algorithmDesignIntent: string;
  discoveriesAndTroubleshooting: string;
  aiConnectionThought: string;
  keyTakeaway: string;
}

export interface ExpertRule {
  id: string;
  condition: string;
  conclusion: string;
}

export interface PresetExample {
  id: string;
  title: string;
  category: '기초 반복/누적' | '수열과 점화식' | '탐색과 최적화' | '인공지능 핵심' | '전문가시스템 & 규칙';
  description: string;
  story: string;
  expertRules?: ExpertRule[];
  testFact?: string;
  presetResult: FlowchartResult;
}
