import { AgentCard } from './AgentCard'

const agents = [
  'Astra', 'Breach', 'Brimstone', 'Chamber', 'Cypher', 'Deadlock', 'Fade', 'Gekko', 'Harbor', 'Iso', 
  'Jett', 'KAY/O', 'Killjoy', 'Neon', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Skye', 
  'Sova', 'Viper', 'Yoru', 'Clove', 'Vyse'
]

export function AgentsContent() {
  return (
    <div className="bg-[#1a0a0e] p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-[#fffbf5] mb-6">Agents</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {agents.map((agent) => (
          <AgentCard key={agent} name={agent} />
        ))}
      </div>
    </div>
  )
}