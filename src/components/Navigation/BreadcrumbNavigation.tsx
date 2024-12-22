import React from 'react';
import Link from 'next/link';

interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

const BreadcrumbNavigation: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            <Link href={item.href} className="text-blue-500 hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;

