import React from 'react'
import { DashboardClient } from './components/DashboardClient'
import { Card } from './components/Card'
import { Chart } from './components/Chart'
import { BarChart } from './components/BarChart'
import { DashboardData, GameMode,DashboardPageProps } from '../../types/index'
import { formatDecimal, roundNumber } from '../../utils/index'
import { AgentsContent } from './components/AgentsContent'
import { WeaponsContent } from './components/WeaponsContent'
import { MapsContent } from './components/MapContent'
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
    gameModeStats: {
      competitive: {
        averageKills: 15.3,
        averageDeaths: 14.1,
        averageAssists: 4.2,
        averageScore: 230,
      },
      deathmatch: {
        averageKills: 22.5,
        averageDeaths: 18.7,
        averageAssists: 0,
        averageScore: 280,
      },
      teamDeathmatch: {
        averageKills: 18.9,
        averageDeaths: 16.2,
        averageAssists: 2.8,
        averageScore: 250,
      },
      spikeRush: {
        averageKills: 10.5,
        averageDeaths: 9.8,
        averageAssists: 3.1,
        averageScore: 180,
      },
    },
    averageMatchStats: {
      averageKills: 16.5,
      averageDeaths: 14.7,
      averageAssists: 3.5,
      averageScore: 240,
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

  const renderHomeContent = (gameMode: GameMode) => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderStatCard("Avg. Kills", formatDecimal(dashboardData.gameModeStats[gameMode].averageKills))}
        {renderStatCard("Avg. Deaths", formatDecimal(dashboardData.gameModeStats[gameMode].averageDeaths))}
        {renderStatCard("Avg. Assists", formatDecimal(dashboardData.gameModeStats[gameMode].averageAssists))}
        {renderStatCard("Avg. Score", roundNumber(dashboardData.gameModeStats[gameMode].averageScore))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Chart title="Agent Pick Rates" data={dashboardData.agentPickRates} />
        <Chart title="Weapon Usage" data={dashboardData.weaponUsage} />
        <BarChart title="Map Win Rates" data={dashboardData.mapWinRates} />
        <BarChart title="Rank Distribution" data={dashboardData.rankDistribution} />
      </div>
    </>
  )

  const gameModes: GameMode[] = ['competitive', 'deathmatch', 'teamDeathmatch', 'spikeRush']
  const homeContentByMode: { [key in GameMode]: React.ReactNode } = {
    competitive: renderHomeContent('competitive'),
    deathmatch: renderHomeContent('deathmatch'),
    teamDeathmatch: renderHomeContent('teamDeathmatch'),
    spikeRush: renderHomeContent('spikeRush'),
  }

  return (
    <DashboardClient
      homeContentByMode={homeContentByMode}
      agentsContent={<AgentsContent />}
      weaponsContent={<WeaponsContent />}
      mapsContent={<MapsContent />}
    />
  )
}

