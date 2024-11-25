import React, { useState } from 'react';
import { Search, School, GraduationCap } from 'lucide-react';
import type { School as SchoolType } from '../types';

interface NavbarProps {
  schools: SchoolType[];
  onSearch: (query: string) => void;
  onFilterChange: (type: string) => void;
}

export default function Navbar({ schools, onSearch, onFilterChange }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md text-white z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <School className="h-8 w-8" />
              <span className="text-xl font-bold">Paris Éducation</span>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => onFilterChange('all')}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition"
              >
                Tous
              </button>
              <button
                onClick={() => onFilterChange('college')}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition flex items-center space-x-2"
              >
                <School className="h-4 w-4" />
                <span>Collèges</span>
              </button>
              <button
                onClick={() => onFilterChange('lycee')}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition flex items-center space-x-2"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Lycées</span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un établissement..."
                className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-md bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}