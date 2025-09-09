import React from 'react';

interface Props {
  title: string;
  count: number;
  icon: React.ReactNode;
  darkMode: boolean;
}

export const SummaryCard = ({ title, count, icon, darkMode }: Props) => (
  <div className={`p-5 rounded-lg shadow-lg flex items-center gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
    <div className="text-blue-500 text-3xl">{icon}</div>
    <div>
      <h3 className="text-sm uppercase tracking-wide opacity-75">{title}</h3>
      <p className="text-3xl font-semibold mt-1">{count}</p>
    </div>
  </div>
);
