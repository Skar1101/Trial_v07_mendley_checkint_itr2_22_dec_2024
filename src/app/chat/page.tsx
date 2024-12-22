'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { collectFeedback } from '@/components/feedback/FeedbackCollector'
import { generateResponse } from '@/lib/ai/openai-client'
import { saveToMemory } from '@/lib/memory/chat-memory'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const preferences = localStorage.getItem('preferences')
    if (!preferences) {
      router.push('/preferences')
    } else {
      setMessages([{ role: 'assistant', content: "Hi! How can I help you today?" }])
    }
  }, [router])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (messages.length > 1) {
      saveToMemory(messages);
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const newMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, newMessage])
    setInput('')
    setIsLoading(true)

    try {
      const aiResponse = await generateResponse(input)
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }])
    } catch (error) {
      console.error('Failed to get AI response:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble responding right now. Please try again." 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col bg-white bg-opacity-10 backdrop-blur-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-purple-600 text-white font-semibold">Chat with Buddy</div>
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-3 rounded-lg ${
              message.role === 'user' ? 'bg-purple-600 text-white ml-auto' : 'bg-white text-purple-600'
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="max-w-[80%] p-3 rounded-lg bg-white text-purple-600">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-purple-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-purple-100 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

