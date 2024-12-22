'use client'

import { useState, useEffect } from 'react'

type JournalEntry = {
  id: number
  content: string
  date: string
}

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [newEntry, setNewEntry] = useState('')

  useEffect(() => {
    const storedEntries = localStorage.getItem('journalEntries')
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEntry.trim()) return

    const newEntryObject: JournalEntry = {
      id: Date.now(),
      content: newEntry,
      date: new Date().toISOString(),
    }

    const updatedEntries = [newEntryObject, ...entries]
    setEntries(updatedEntries)
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries))
    setNewEntry('')
  }

  return (
    <div className="max-w-2xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Journal</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Write your journal entry..."
          className="w-full h-40 p-4 rounded-lg bg-purple-700 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          className="mt-4 bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition-colors"
        >
          Save Entry
        </button>
      </form>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Previous Entries</h2>
        {entries.map((entry) => (
          <div key={entry.id} className="bg-white bg-opacity-20 p-4 rounded-lg">
            <div className="text-sm text-purple-200 mb-2">{new Date(entry.date).toLocaleString()}</div>
            <div className="text-white whitespace-pre-wrap">{entry.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

