import React from 'react';
import Image from 'next/image';

interface ValorantModalProps {
  data: any;
  type: 'agent' | 'weapon' | 'map';
  onClose: () => void;
}

export function ValorantModal({ data, type, onClose }: ValorantModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#171717] p-8 rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="float-right text-white text-2xl">&times;</button>
        {data?.displayName && (
          <h2 className="text-2xl font-bold text-white mb-4">{data.displayName}</h2>
        )}
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <img
              src={data?.fullPortrait || data?.displayIcon || data?.splash || '/default-image.png'} // Fallback image
              alt={data?.displayName || 'Valorant Asset'}
              width={300}
              height={400}
              className='object-contain'
            />
          </div>
          <div className="md:w-1/2 md:pl-4">
            {type === 'agent' && data?.description && (
              <>
                <p className="text-white mb-2">{data.description}</p>
                {data?.abilities && (
                  <>
                    <h3 className="text-xl font-bold text-white mt-4 mb-2">Abilities:</h3>
                    {data.abilities.map((ability: any) => (
                      <div key={ability.slot} className="mb-2">
                        <h4 className="text-lg font-semibold text-white">{ability.displayName}</h4>
                        <p className="text-white">{ability.description}</p>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
            {type === 'weapon' && data?.weaponStats && (
              <>
                <p className="text-white mb-2">Category: {data.category}</p>
                <h3 className="text-xl font-bold text-white mt-4 mb-2">Stats:</h3>
                <ul className="text-white">
                  <li>Fire Rate: {data.weaponStats.fireRate}</li>
                  <li>Magazine Size: {data.weaponStats.magazineSize}</li>
                  <li>Reload Time: {data.weaponStats.reloadTimeSeconds}s</li>
                </ul>
              </>
            )}
            {type === 'map' && (
              <>
                <p className="text-white mb-2">{data?.coordinates}</p>
                <p className="text-white mb-2">{data?.tacticalDescription}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
