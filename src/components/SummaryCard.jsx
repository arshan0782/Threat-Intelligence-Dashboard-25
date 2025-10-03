import React from 'react';
import {useThreatStore} from '../store/useThreatStore.js';

export const SummaryCard = ({ title, icon, darkMode, type }) => {
  const { threats } = useThreatStore();

  const getCount = () => {
    if (title === "Total IOCs") {
      return threats.length;
    }
    const filteredThreats = threats.filter(ioc => ioc.type === type);
    return new Set(filteredThreats.map(i => i.value)).size;
    
  };

  return (
    <div className={`p-5 rounded-lg shadow-lg flex items-center gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="text-blue-500 text-3xl">{icon}</div>
      <div>
        <h3 className="text-sm uppercase tracking-wide opacity-75">{title}</h3>
        <p className="text-3xl font-semibold mt-1">{getCount()}</p>
      </div>
    </div>
  );
};