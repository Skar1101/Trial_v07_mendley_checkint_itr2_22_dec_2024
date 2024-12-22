import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav>
        <ul>
          <li className="mb-2">
            <Link href="/" className="block hover:bg-gray-700 p-2 rounded">
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/chat" className="block hover:bg-gray-700 p-2 rounded">
              Chat
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/journal" className="block hover:bg-gray-700 p-2 rounded">
              Journal
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/memory" className="block hover:bg-gray-700 p-2 rounded">
              Memory
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/preferences" className="block hover:bg-gray-700 p-2 rounded">
              Preferences
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

