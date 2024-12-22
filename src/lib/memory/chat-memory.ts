export interface ChatMemory {
  id: string;
  timestamp: string;
  messages: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }[];
}

export async function saveToMemory(messages: { role: 'user' | 'assistant'; content: string }[]): Promise<void> {
  try {
    // Save to localStorage as backup
    const existingMemory = localStorage.getItem('chat_memory');
    const memories: ChatMemory[] = existingMemory ? JSON.parse(existingMemory) : [];

    const newMemory: ChatMemory = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      messages: messages.map(msg => ({
        ...msg,
        timestamp: new Date().toISOString()
      }))
    };

    memories.push(newMemory);
    localStorage.setItem('chat_memory', JSON.stringify(memories));

    // Save to server
    await fetch('/api/memory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'chat', data: newMemory })
    });
  } catch (error) {
    console.error('Error saving memory:', error);
  }
}

export async function getMemories(): Promise<ChatMemory[]> {
  try {
    // Get from localStorage as backup
    const localMemories = localStorage.getItem('chat_memory');
    const memories = localMemories ? JSON.parse(localMemories) : [];

    // Get from server
    try {
      const response = await fetch('/api/memory?type=chat');
      const data = await response.json();
      
      if (data.memories) {
        // Merge memories, removing duplicates based on id
        const allMemories = [...memories, ...data.memories];
        const uniqueMemories = Array.from(
          new Map(allMemories.map(item => [item.id, item])).values()
        );
        
        return uniqueMemories.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      }
    } catch (error) {
      console.error('Error fetching from server:', error);
    }

    return memories;
  } catch (error) {
    console.error('Error getting memories:', error);
    return [];
  }
}

export async function clearMemories(): Promise<void> {
  try {
    // Clear localStorage
    localStorage.removeItem('chat_memory');

    // Clear on server
    await fetch('/api/memory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'chat', data: [] })
    });
  } catch (error) {
    console.error('Error clearing memories:', error);
  }
} 