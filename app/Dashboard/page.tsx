import { DashboardClient } from './components/DashboardClient'
import { Card } from './components/Card'
import { Chart } from './components/Chart'
import { BarChart } from './components/BarChart'
import type { DashboardData } from '@types'
import { formatDecimal, roundNumber } from '@utils/index'

// This data fetching would typically be done from a database or API
const fetchDashboardData = (): DashboardData => {
  return {
    agentPickRates: [
      { name: 'Jett', value: 25 },
      { name: 'Reyna', value: 20 },
      { name: 'Sage', value: 18 },
      { name: 'Omen', value: 15 },
      { name: 'Sova', value: 12 },
      { name: 'Others', value: 10 },
    ],
    weaponUsage: [
      { name: 'Vandal', value: 35 },
      { name: 'Phantom', value: 30 },
      { name: 'Operator', value: 15 },
      { name: 'Spectre', value: 10 },
      { name: 'Sheriff', value: 5 },
      { name: 'Others', value: 5 },
    ],
    mapWinRates: [
      { map: 'Ascent', winRate: 52 },
      { map: 'Bind', winRate: 48 },
      { map: 'Haven', winRate: 51 },
      { map: 'Split', winRate: 50 },
      { map: 'Icebox', winRate: 49 },
    ],
    averageMatchStats: {
      averageKills: 15.3,
      averageDeaths: 14.1,
      averageAssists: 4.2,
      averageScore: 230,
    },
    rankDistribution: [
      { rank: 'Iron', percentage: 15 },
      { rank: 'Bronze', percentage: 25 },
      { rank: 'Silver', percentage: 30 },
      { rank: 'Gold', percentage: 20 },
      { rank: 'Platinum', percentage: 7 },
      { rank: 'Diamond', percentage: 2 },
      { rank: 'Immortal', percentage: 0.9 },
      { rank: 'Radiant', percentage: 0.1 },
    ],
  }
}

export default function DashboardPage() {
  const dashboardData = fetchDashboardData()

  const renderStatCard = (title: string, value: string | number) => (
    <Card
      title={title}
      content={
        <div className="flex items-center justify-center">
          <span className="text-3xl font-bold text-[#fd4556]">{value}</span>
        </div>
      }
    />
  )

  return (
    <DashboardClient>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderStatCard("Avg. Kills", formatDecimal(dashboardData.averageMatchStats.averageKills))}
        {renderStatCard("Avg. Deaths", formatDecimal(dashboardData.averageMatchStats.averageDeaths))}
        {renderStatCard("Avg. Assists", formatDecimal(dashboardData.averageMatchStats.averageAssists))}
        {renderStatCard("Avg. Score", roundNumber(dashboardData.averageMatchStats.averageScore))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {renderStatCard("Avg. Kills", formatDecimal(dashboardData.averageMatchStats.averageKills))}
        {renderStatCard("Avg. Deaths", formatDecimal(dashboardData.averageMatchStats.averageDeaths))}
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Chart title="Agent Pick Rates" data={dashboardData.agentPickRates} />
        <Chart title="Weapon Usage" data={dashboardData.weaponUsage} />
        <BarChart title="Map Win Rates" data={dashboardData.mapWinRates} />
        <BarChart title="Rank Distribution" data={dashboardData.rankDistribution} />
      </div>
    </DashboardClient>
  )
}