import { ReactNode } from 'react';

export type MessageContentType = 'text' | 'chart' | 'stats' | 'goals' | 'mixed';

export interface MessageContent {
  type: MessageContentType;
  text?: string;
  component?: ReactNode;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string | MessageContent[];
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}
