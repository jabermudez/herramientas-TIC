export type CalloutType = 'tip' | 'warning' | 'curiosity' | 'challenge';

export interface CalloutBox {
  type: CalloutType;
  title: string;
  content: string;
}

export interface ActivityStep {
  step: number;
  instruction: string;
  detail: string;
  expectedResult?: string;
}

export interface UnitSection {
  id: string;
  title: string;
  content: string;
  analogy?: {
    concept: string;
    comparison: string;
    explanation: string;
  };
  callouts?: CalloutBox[];
  steps?: ActivityStep[];
  bulletPoints?: string[];
  interactiveComponentId?: 'hardware-lab' | 'spreadsheet-lab' | 'whatsapp-lab' | 'shortcuts-lab' | 'prompt-lab' | 'phishing-lab' | 'ports-lab' | 'search-lab';
  didacticGraphicId?: 'ecosistema-tic' | 'hardware-bus' | 'data-units' | 'os-architecture' | 'file-hierarchy' | 'excel-formula' | 'cloud-sync' | 'cyber-shield' | 'battery-care' | 'computer-cycle';
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Flashcard {
  front: string;
  back: string;
  hint?: string;
}

export interface Unit {
  id: string;
  unitNumber: number;
  title: string;
  subtitle: string;
  level: 'Nivel Básico' | 'Nivel Básico a Intermedio' | 'Nivel Intermedio';
  summary: string;
  learningObjectives: string[];
  sections: UnitSection[];
  flashcards?: Flashcard[];
  practicalWorkshop: {
    title: string;
    description: string;
    steps: ActivityStep[];
    deliverable: string;
  };
  quiz: QuizQuestion[];
  reviewSummary: string[];
}

export interface ShortcutItem {
  keys: string[];
  action: string;
  category: 'edicion' | 'sistema' | 'ventanas' | 'navegador' | 'captura';
  context: 'Windows' | 'Navegador Web' | 'Ambos';
  tip: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'Hardware' | 'Software' | 'Redes e Internet' | 'Ofimática' | 'Seguridad' | 'Inteligencia Artificial';
}
