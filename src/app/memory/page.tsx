'use client'

import { useState, useEffect } from 'react'
import { getMemories, ChatMemory } from '@/lib/memory/chat-memory'
import { getJournalEntries, JournalEntry } from '@/lib/memory/journal-memory'

type MemoryType = 'all' | 'chat' | 'journal'

export default function Memory() {
  const [chatMemories, setChatMemories] = useState<ChatMemory[]>([])
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<MemoryType>('all')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      const chats = await getMemories();
      setChatMemories(chats);
      const entries = await getJournalEntries();
      setJournalEntries(entries);
    }
    loadData();
  }, []);

  const filteredMemories = {
    chat: chatMemories.filter(chat => 
      chat.messages.some(msg => 
        msg.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ),
    journal: journalEntries.filter(entry =>
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">Memory Bank</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search memories..."
            className="flex-1 px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <div className="flex rounded-full bg-white/10 p-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeTab === 'all' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeTab === 'chat' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Chats
            </button>
            <button
              onClick={() => setActiveTab('journal')}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeTab === 'journal' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Journal
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden">
        {/* Table Headers */}
        <div className="grid grid-cols-[1fr,auto,auto] gap-4 p-4 border-b border-white/10 font-semibold text-white">
          <div>Title/Preview</div>
          <div>Type</div>
          <div>Date</div>
        </div>

        {/* Table Content */}
        <div className="divide-y divide-white/10">
          {/* Chat Memories */}
          {(activeTab === 'all' || activeTab === 'chat') && filteredMemories.chat.map((memory) => (
            <div key={memory.id} className="cursor-pointer hover:bg-white/5">
              <div 
                className="grid grid-cols-[1fr,auto,auto] gap-4 p-4"
                onClick={() => setExpandedItem(expandedItem === memory.id ? null : memory.id)}
              >
                <div className="text-white truncate">
                  {memory.messages[0]?.content || 'Empty chat'}
                </div>
                <div className="text-purple-200">Chat</div>
                <div className="text-white/60 whitespace-nowrap">
                  {new Date(memory.timestamp).toLocaleDateString()}
                </div>
              </div>
              
              {/* Expanded View */}
              {expandedItem === memory.id && (
                <div className="px-4 pb-4 space-y-4">
                  {memory.messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-purple-600 text-white ml-auto'
                          : 'bg-white/20 text-white'
                      }`}
                    >
                      {msg.content}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Journal Entries */}
          {(activeTab === 'all' || activeTab === 'journal') && filteredMemories.journal.map((entry) => (
            <div key={entry.id} className="cursor-pointer hover:bg-white/5">
              <div 
                className="grid grid-cols-[1fr,auto,auto] gap-4 p-4"
                onClick={() => setExpandedItem(expandedItem === entry.id.toString() ? null : entry.id.toString())}
              >
                <div className="text-white truncate">
                  {entry.content.split('\n')[0]}
                </div>
                <div className="text-purple-200">Journal</div>
                <div className="text-white/60 whitespace-nowrap">
                  {new Date(entry.date).toLocaleDateString()}
                </div>
              </div>

              {/* Expanded View */}
              {expandedItem === entry.id.toString() && (
                <div className="px-4 pb-4">
                  <div className="text-white whitespace-pre-wrap bg-white/10 p-4 rounded-lg">
                    {entry.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {((activeTab === 'all' && !filteredMemories.chat.length && !filteredMemories.journal.length) ||
          (activeTab === 'chat' && !filteredMemories.chat.length) ||
          (activeTab === 'journal' && !filteredMemories.journal.length)) && (
          <div className="text-center text-white/60 py-12">
            {searchTerm
              ? 'No memories found matching your search.'
              : 'No memories saved yet. Start chatting or journaling to create memories.'}
          </div>
        )}
      </div>
    </div>
  )
}

