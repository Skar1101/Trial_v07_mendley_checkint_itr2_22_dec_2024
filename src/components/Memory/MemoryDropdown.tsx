import React from 'react';

interface MemoryDropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const MemoryDropdown: React.FC<MemoryDropdownProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  return (
    <select
      value={selectedOption}
      onChange={(e) => onSelect(e.target.value)}
      className="p-2 border rounded"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default MemoryDropdown;

