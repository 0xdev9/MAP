import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { School, GraduationCap } from 'lucide-react';
import L from 'leaflet';
import Navbar from './components/Navbar';
import SchoolPopup from './components/SchoolPopup';
import { schools as initialSchools } from './data/schools';
import { PARIS_CENTER, DEFAULT_ZOOM } from './config';
import type { School as SchoolType } from './types';

import 'leaflet/dist/leaflet.css';

function FlyToSchool({ coords }: { coords: [number, number] | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (coords) {
      map.flyTo([coords[1], coords[0]], 15, {
        duration: 1.5
      });
    }
  }, [coords, map]);

  return null;
}

function App() {
  const [schools, setSchools] = useState<SchoolType[]>(() => {
    const saved = localStorage.getItem('schools');
    return saved ? JSON.parse(saved) : initialSchools;
  });
  
  const [selectedSchool, setSelectedSchool] = useState<SchoolType | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [flyToCoords, setFlyToCoords] = useState<[number, number] | null>(null);

  useEffect(() => {
    localStorage.setItem('schools', JSON.stringify(schools));
  }, [schools]);

  const handleToggleComplete = (id: string) => {
    setSchools(schools.map(school => 
      school.id === id ? { ...school, completed: !school.completed } : school
    ));
  };

  const filteredSchools = schools.filter(school => {
    const matchesFilter = filter === 'all' || school.type === filter;
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSchoolClick = (school: SchoolType) => {
    setSelectedSchool(school);
    setFlyToCoords(school.coordinates);
  };

  const createCustomIcon = (type: 'college' | 'lycee', completed: boolean) => {
    const color = completed ? '#f87171' : '#4ade80';
    
    // Create SVG path based on icon type
    const iconPath = type === 'college' 
      ? 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5v-2.5A2.5 2.5 0 0 1 6.5 14h13.5M20 14v8M15 14v8M10 14v8M6.5 14H20'
      : 'M22 10v6M2 10l10-5 10 5-10 5z';

    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="${iconPath}"></path>
      </svg>
    `;

    return L.divIcon({
      html: svgIcon,
      className: `custom-marker ${completed ? 'completed' : ''}`,
      iconSize: [24, 24],
    });
  };

  return (
    <div className="h-screen w-screen">
      <Navbar 
        schools={schools}
        onSearch={setSearchQuery}
        onFilterChange={setFilter}
      />
      
      <MapContainer
        center={[PARIS_CENTER[1], PARIS_CENTER[0]]}
        zoom={DEFAULT_ZOOM}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <FlyToSchool coords={flyToCoords} />
        
        {filteredSchools.map(school => (
          <Marker
            key={school.id}
            position={[school.coordinates[1], school.coordinates[0]]}
            icon={createCustomIcon(school.type, school.completed)}
            eventHandlers={{
              click: () => handleSchoolClick(school),
            }}
          >
            {selectedSchool?.id === school.id && (
              <Popup>
                <SchoolPopup
                  school={school}
                  onToggleComplete={handleToggleComplete}
                />
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;