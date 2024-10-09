import React from 'react';
import Image from 'next/image';

interface ValorantCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

export function ValorantCard({ name, image, onClick }: ValorantCardProps) {
  return (
    <div 
      className="relative w-64 h-96 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
      onClick={onClick}
    >
      <img
        src={image}
        alt={name}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-4 left-4 text-white text-xl font-bold">{name}</div>
    </div>
  );
}