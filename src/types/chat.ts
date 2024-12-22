export interface ChatMessage {
    id: string;
    content: string;
    timestamp: string;
    sender: 'user' | 'ai';
  }
  
  export interface ChatHistory {
    messages: ChatMessage[];
  }
  
  export interface ChatSettings {
    mode: 'friend' | 'mentor' | 'chitchat';
    objective: 'emotional-release' | 'confidence-building' | 'general';
  }
  
  