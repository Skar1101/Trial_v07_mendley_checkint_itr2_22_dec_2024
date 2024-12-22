export interface JournalEntry {
  id: number;
  content: string;
  date: string;
}

export async function saveJournalEntry(content: string): Promise<void> {
  try {
    // Save to localStorage as backup
    const existingEntries = localStorage.getItem('journalEntries');
    const entries: JournalEntry[] = existingEntries ? JSON.parse(existingEntries) : [];

    const newEntry: JournalEntry = {
      id: Date.now(),
      content,
      date: new Date().toISOString()
    };

    entries.push(newEntry);
    localStorage.setItem('journalEntries', JSON.stringify(entries));

    // Save to server
    await fetch('/api/memory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'journal', data: newEntry })
    });
  } catch (error) {
    console.error('Error saving journal entry:', error);
  }
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  try {
    // Get from localStorage as backup
    const localEntries = localStorage.getItem('journalEntries');
    const entries = localEntries ? JSON.parse(localEntries) : [];

    // Get from server
    try {
      const response = await fetch('/api/memory?type=journal');
      const data = await response.json();
      
      if (data.journal) {
        // Merge entries, removing duplicates based on id
        const allEntries = [...entries, ...data.journal];
        const uniqueEntries = Array.from(
          new Map(allEntries.map(item => [item.id, item])).values()
        );
        
        return uniqueEntries.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      }
    } catch (error) {
      console.error('Error fetching from server:', error);
    }

    return entries;
  } catch (error) {
    console.error('Error getting journal entries:', error);
    return [];
  }
}

export async function clearJournalEntries(): Promise<void> {
  try {
    // Clear localStorage
    localStorage.removeItem('journalEntries');

    // Clear on server
    await fetch('/api/memory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'journal', data: [] })
    });
  } catch (error) {
    console.error('Error clearing journal entries:', error);
  }
} 