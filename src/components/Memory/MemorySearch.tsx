import React, { useState } from 'react';

interface MemorySearchProps {
  onSearch: (query: string) => void;
}

const MemorySearch: React.FC<MemorySearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search memories..."
        className="flex-1 p-2 border rounded-l-lg"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-r-lg"
      >
        Search
      </button>
    </form>
  );
};

export default MemorySearch;

