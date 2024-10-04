import { WeaponCard } from './WeaponCard'

const weapons = [
  'Classic', 'Shorty', 'Frenzy', 'Ghost', 'Sheriff', 'Stinger', 'Spectre', 'Bucky', 'Judge', 'Bulldog',
  'Guardian', 'Phantom', 'Vandal', 'Marshal', 'Operator', 'Ares', 'Odin', 'Tactical Knife'
]

export function WeaponsContent() {
  return (
    <div className="bg-[#1a0a0e] p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-[#fffbf5] mb-6">Weapons</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {weapons.map((weapon) => (
          <WeaponCard key={weapon} name={weapon} />
        ))}
      </div>
    </div>
  )
}