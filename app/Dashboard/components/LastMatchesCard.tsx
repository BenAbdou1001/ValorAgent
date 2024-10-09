import React from 'react';
import { Check, X } from 'lucide-react';

interface LastMatchesCardProps {
  matches: { result: 'WON' | 'LOSS' }[];
}

export function LastMatchesCard({ matches }: LastMatchesCardProps) {
  return (
    <div className="bg-[#171717] p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-[#fffbf5] mb-4">Last {matches.length} Matches</h3>
      <div className="flex justify-center space-x-2">
        {matches.map((match, index) => (
          <div
            key={index}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              match.result === 'WON' ? 'bg-green-500' : 'bg-red-500'
            } ${index === matches.length - 1 ? 'w-12 h-12' : ''}`}
          >
            {match.result === 'WON' ? (
              <Check className="w-6 h-6 text-white" />
            ) : (
              <X className="w-6 h-6 text-white" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}