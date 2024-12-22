export interface JournalEntry {
    id: string;
    content: string;
    timestamp: string;
    mood?: string;
    tags?: string[];
  }
  
  export interface JournalHistory {
    entries: JournalEntry[];
  }
  
  