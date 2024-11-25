import React from 'react';
import { Check, X } from 'lucide-react';
import type { School } from '../types';

interface SchoolPopupProps {
  school: School;
  onToggleComplete: (id: string) => void;
}

export default function SchoolPopup({ school, onToggleComplete }: SchoolPopupProps) {
  return (
    <div className="p-4 min-w-[250px] text-white">
      <h3 className="text-lg font-semibold mb-2">{school.name}</h3>
      <p className="text-sm text-gray-300 mb-3">
        {school.type === 'college' ? 'Collège' : 'Lycée'}
      </p>
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={school.completed}
            onChange={() => onToggleComplete(school.id)}
            className="hidden"
          />
          <div className={`p-2 rounded-full transition-all duration-300 ${
            school.completed 
              ? 'bg-red-500/20 group-hover:bg-red-500/30' 
              : 'bg-green-500/20 group-hover:bg-green-500/30'
          }`}>
            {school.completed ? (
              <X className="h-4 w-4 text-red-400" />
            ) : (
              <Check className="h-4 w-4 text-green-400" />
            )}
          </div>
          <span className="text-sm font-medium">
            {school.completed ? 'Fait' : 'Non fait'}
          </span>
        </label>
      </div>
    </div>
  );
}