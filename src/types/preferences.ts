export interface UserPreferences {
    name: string;
    chatMode: 'friend' | 'mentor' | 'chitchat';
    primaryObjective: 'emotional-release' | 'confidence-building' | 'general';
    notificationSettings: {
      email: boolean;
      push: boolean;
      frequency: 'daily' | 'weekly' | 'monthly';
    };
    theme: 'light' | 'dark' | 'system';
    language: string;
  }
  
  