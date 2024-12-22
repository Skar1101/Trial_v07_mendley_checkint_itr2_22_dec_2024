'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Preferences() {
  const [characteristics, setCharacteristics] = useState('')
  const [objective, setObjective] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('preferences', JSON.stringify({ characteristics, objective }))
    router.push('/chat')
  }

  return (
    <div className="max-w-md mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Set Your Preferences</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="characteristics" className="block text-white mb-2">App Characteristics:</label>
          <select
            id="characteristics"
            value={characteristics}
            onChange={(e) => setCharacteristics(e.target.value)}
            className="w-full bg-purple-700 text-white rounded px-3 py-2"
            required
          >
            <option value="">Select...</option>
            <option value="friend">Friend</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>
        <div>
          <label htmlFor="objective" className="block text-white mb-2">Objective:</label>
          <select
            id="objective"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full bg-purple-700 text-white rounded px-3 py-2"
            required
          >
            <option value="">Select...</option>
            <option value="emotional-release">Emotional Release</option>
            <option value="building-confidence">Building Confidence</option>
            <option value="friendly-chit-chat">Friendly Chit Chat</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-white text-purple-600 py-2 rounded-full font-semibold hover:bg-purple-100 transition-colors"
        >
          Save Preferences
        </button>
      </form>
    </div>
  )
}

