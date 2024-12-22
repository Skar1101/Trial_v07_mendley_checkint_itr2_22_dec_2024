import React from 'react';

interface JournalEntry {
  id: string;
  content: string;
  date: string;
}

interface JournalHistoryProps {
  entries: JournalEntry[];
}

const JournalHistory: React.FC<JournalHistoryProps> = ({ entries }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Journal History</h2>
      {entries.map((entry) => (
        <div key={entry.id} className="border p-4 rounded">
          <p className="text-sm text-gray-500">{entry.date}</p>
          <p className="mt-2">{entry.content}</p>
        </div>
      ))}
    </div>
  );
};

export default JournalHistory;

