'use client'

import React, { useState, useEffect } from 'react';
import { ValorantModal } from './ValorantModal';
import { MapCard } from './MapCard';

export function MapsContent() {
  const [maps, setMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);

  useEffect(() => {
    const fetchMaps = async () => {
      const response = await fetch('/api/valorant-data?type=maps');
      const data = await response.json();
      setMaps(data.data);
    };
    fetchMaps();
  }, []);

  return (
    maps.length > 0 ? (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Maps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {maps.map((map: any) => (
            <MapCard
              key={map.uuid}
              name={map.displayName}
              image={map.splash}
              onClick={() => setSelectedMap(map)}
            />
          ))}
        </div>
        {selectedMap && (
          <ValorantModal
            data={selectedMap}
            type="map"
            onClose={() => setSelectedMap(null)}
          />
        )}
      </div>
    ) : (
      <div className='h-full w-full flex'>
        <span className="loading loading-bars loading-lg justify-center items-center m-auto"></span>
      </div>
    )
  );
}