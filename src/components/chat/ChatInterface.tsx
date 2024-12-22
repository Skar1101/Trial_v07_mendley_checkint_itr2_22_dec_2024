import React, { useState } from 'react';
import ChatInput from './ChatInput';
import VoiceInput from './VoiceInput';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
    };
    setMessages([...messages, newMessage]);
    // TODO: Implement AI response logic
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <ChatInput onSendMessage={handleSendMessage} />
        <VoiceInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;

