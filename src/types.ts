export interface School {
  id: string;
  name: string;
  type: 'college' | 'lycee';
  coordinates: [number, number];
  completed: boolean;
}

export interface MapRef {
  flyTo: (options: { center: [number, number]; zoom: number }) => void;
}