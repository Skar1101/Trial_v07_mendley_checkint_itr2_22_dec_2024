import React, { useState } from 'react';

interface VoiceInputProps {
  onSendMessage: (message: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onSendMessage }) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    // TODO: Implement voice input functionality
    setIsListening(!isListening);
  };

  return (
    <button
      onClick={handleVoiceInput}
      className="p-2 rounded-full hover:bg-white/10 transition-colors"
    >
      <span className="text-xl">{isListening ? '🔴' : '🎤'}</span>
    </button>
  );
};

export default VoiceInput;

