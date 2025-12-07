export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  progress: number; // 0-100
  duration?: string;
  timeLeft?: string;
  category?: string;
  size?: string;
  dateAdded?: string;
}

export type Emotion = 'Neutro' | 'Alegre' | 'Calmo' | 'Sério';

export interface VoiceSettings {
  type: 'Masculina' | 'Feminina' | 'Neutra';
  emotion: Emotion;
  speed: number;
  pitch: number;
  pauses: number;
  emphasis: number;
}
