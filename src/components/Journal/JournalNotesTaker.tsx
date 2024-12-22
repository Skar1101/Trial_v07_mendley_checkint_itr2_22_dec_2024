import React, { useState } from 'react';

interface JournalNotesTakerProps {
  onSaveNote: (note: string) => void;
}

const JournalNotesTaker: React.FC<JournalNotesTakerProps> = ({ onSaveNote }) => {
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim()) {
      onSaveNote(note);
      setNote('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your journal entry..."
        className="w-full h-40 p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded"
      >
        Save Entry
      </button>
    </form>
  );
};

export default JournalNotesTaker;

