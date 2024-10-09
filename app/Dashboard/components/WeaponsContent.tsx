'use client'

import React, { useState, useEffect } from 'react';
import { ValorantModal } from './ValorantModal';
import { WeaponCard } from './WeaponCard';

export function WeaponsContent() {
  const [weapons, setWeapons] = useState([]);
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  useEffect(() => {
    const fetchWeapons = async () => {
      const response = await fetch('/api/valorant-data?type=weapons');
      const data = await response.json();
      setWeapons(data.data);
    };
    fetchWeapons();
  }, []);

  return (
    weapons.length > 0 ? (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Weapons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {weapons.map((weapon: any) => (
            <WeaponCard
              key={weapon.uuid}
              name={weapon.displayName}
              image={weapon.displayIcon}
              onClick={() => setSelectedWeapon(weapon)}
            />
          ))}
        </div>
        {selectedWeapon && (
          <ValorantModal
            data={selectedWeapon}
            type="weapon"
            onClose={() => setSelectedWeapon(null)}
          />
        )}
      </div>
    ) : (
      <div className='h-full w-full flex'>
      <span className="loading loading-ring loading-lg justify-center items-center m-auto"></span>
      </div>
    )
  );
}