import { MapCard } from './MapCard'

const maps = [
  'Ascent', 'Bind', 'Haven', 'Split', 'Icebox', 'Breeze', 'Fracture', 'Pearl', 'Lotus', 'Sunset'
]

export function MapsContent() {
  return (
    <div className="bg-[#1a0a0e] p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-[#fffbf5] mb-6">Maps</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {maps.map((map) => (
          <MapCard key={map} name={map} />
        ))}
      </div>
    </div>
  )
}