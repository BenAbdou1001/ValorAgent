'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams from Next.js
import { Search, Filter, Menu, X } from 'lucide-react';
import { SideNavigation } from './SideNavigation';
import { FilterOptions, DashboardData, GameMode, TimeRange, DashboardClientProps, GameCount  } from '../../../types/index';
import { processApiData, fetchMatchData, formatDecimal, roundNumber } from '../../../utils/index';
import { Card } from './Card';
import { Chart } from './Chart';
import { BarChart } from './BarChart';
import { LastMatchesCard } from './LastMatchesCard';
import { AgentsContent } from './AgentsContent';
import { WeaponsContent } from './WeaponsContent';
import { MapsContent } from './MapContent';
import { HeadshotPercentageChart } from './HeadshotPercentageChart';
import { AbilityUsageChart } from './AbilityUsageChart';

export function DashboardClient({
  initialFilters
}: DashboardClientProps) {
  const searchParams = useSearchParams(); // Use the useSearchParams hook
  const query = searchParams?.get('query') || ''; // Get the query parameter
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    agentPickRates: [],
    abilityUsage: {
      c_cast: 0,
      q_cast: 0,
      e_cast: 0,
      x_cast: 0
    },
    mapWinRates: [],
    playerStats: {
      averageKills: 0,
      averageDeaths: 0,
      averageAssists: 0,
      averageScore: 0,
      headshot_percentage: 0,
      bodyshot_percentage: 0,
      legshot_percentage: 0,
    },
    lastMatches: [],
    gameModeStats: {},
    rankDistribution: [],
  });
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const [accountName, setAccountName] = useState(''); // New state for accountName
  const [region, setRegion] = useState('');
  const [tagname, setTagname] = useState('');
  const [loading , setLoading] = useState(true);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const handleFilterChange = async (key: keyof FilterOptions, value: GameMode | GameCount) => {
    const newFilters = { ...filters, [key]: value };
    const nameFromQuery = searchParams?.get('accountName') || '';
    const regionFromQuery = searchParams?.get('region') || '';
    const tagFromQuery = searchParams?.get('tagName') || '';
    setAccountName(nameFromQuery);
    setRegion(regionFromQuery);
    setTagname(tagFromQuery);
    setFilters(newFilters);
    setLoading(true);

    try {

      const matchData = await fetchMatchData(regionFromQuery, nameFromQuery, tagFromQuery , newFilters.gameCount, newFilters.mode);
      if (!matchData || matchData.length === 0) {
        throw new Error('No match data available for the selected filters');
      }
      const newDashboardData = processApiData(matchData, newFilters, nameFromQuery, tagFromQuery);
      setDashboardData(newDashboardData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching updated match data:', error);
      setLoading(false);
      // Handle error (e.g., show error message to user)
    }
  };

  const renderStatCard = (title: string, value: string | number) => (
    <Card
      title={title}
      content={
        <div className="flex items-center justify-center">
          {loading ? (
            <span className="loading loading-bars loading-lg justify-center items-center m-auto"></span>
          ) : value ? (
            <span className="text-3xl font-bold text-[#fd4556]">{value}</span>
          ) : (
            <span className="text-[#fffbf5]">No data available</span>
          )}
        </div>
      }
    />
  );

  const renderHomeContent = (data: DashboardData) => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderStatCard("Avg. Kills", formatDecimal(data.playerStats.averageKills))}
        {renderStatCard("Avg. Deaths", formatDecimal(data.playerStats.averageDeaths))}
        {renderStatCard("Avg. Assists", formatDecimal(data.playerStats.averageAssists))}
        {renderStatCard("Avg. Score", roundNumber(data.playerStats.averageScore))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {
          loading ? (
            <div className="h-full w-full flex bg-[#171717] p-6 rounded-lg shadow-md">
              <span className="loading loading-bars loading-lg justify-center items-center m-auto"></span>
            </div>
          ) : data.agentPickRates && data.agentPickRates.length > 0 ? (
            <Chart title="Agent Pick Rates" data={data.agentPickRates} />
          ) : (
            <div className="bg-[#171717] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#fffbf5] mb-4 uppercase tracking-wide">Agent Pick Rates</h3>
              <p className="text-[#fffbf5]">No agent pick rate data available</p>
            </div>
          )
        }
        {
          loading ? (
            <div className="h-full w-full flex bg-[#171717] p-6 rounded-lg shadow-md">
              <span className="loading loading-bars loading-lg justify-center items-center m-auto"></span>
            </div>
          ) : data.abilityUsage && data.abilityUsage.c_cast > 0 && data.abilityUsage.e_cast > 0 && data.abilityUsage.q_cast > 0 && data.abilityUsage.x_cast > 0 ? (
            <AbilityUsageChart abilityCasts={data.abilityUsage} />
          ) : (
            <div className="bg-[#171717] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#fffbf5] mb-4 uppercase tracking-wide">Ability Usage</h3>
              <p className="text-[#fffbf5]">No Ability usage data available</p>
            </div>
          )
        }
        {
          loading ? (
            <div className="h-full w-full flex bg-[#171717] p-6 rounded-lg shadow-md">
              <span className="loading loading-bars loading-lg justify-center items-center m-auto"></span>
            </div>
          ) : data.mapWinRates && data.mapWinRates.length > 0 ? (
            <BarChart title="Map Win Rates" data={data.mapWinRates} />
          ) : (
            <div className="bg-[#171717] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#fffbf5] mb-4 uppercase tracking-wide">Map Win Rates</h3>
              <p className="text-[#fffbf5]">No map win rate data available</p>
            </div>
          )
        }
        {
          loading ? (
            <div className="h-full w-full flex bg-[#171717] p-6 rounded-lg shadow-md">
              <span className="loading loading-bars loading-lg justify-center items-center m-auto"></span>
            </div>
          ) : (
            data.playerStats.headshot_percentage && data.playerStats.bodyshot_percentage && data.playerStats.legshot_percentage ? (
              <HeadshotPercentageChart
                headshotPercentage={data.playerStats.headshot_percentage}
                bodyshotPercentage={data.playerStats.bodyshot_percentage}
                legshotPercentage={data.playerStats.legshot_percentage}
              />
            ) : (
              <div className="bg-[#171717] p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#fffbf5] mb-4 uppercase tracking-wide">Shot Distribution</h3>
                <p className="text-[#fffbf5]">No shot distribution data available</p>
              </div>
            )
          )
        }

      </div>
      <div className="mt-8">
      <LastMatchesCard matches={data.lastMatches} />
    </div>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeContent(dashboardData);
      case 'agents':
        return <><AgentsContent /></>;
      case 'weapons':
        return <><WeaponsContent /></>;
      case 'maps':
        return <><MapsContent /></>;
      default:
        return renderHomeContent(dashboardData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setSearchQuery(query);
      setLoading(true);
      const nameFromQuery = searchParams?.get('accountName') || '';
      const regionFromQuery = searchParams?.get('region') || '';
      const tagFromQuery = searchParams?.get('tagName') || '';
      setAccountName(nameFromQuery);
      setRegion(regionFromQuery);
      setTagname(tagFromQuery);

      try {
        const matchData = await fetchMatchData(regionFromQuery, nameFromQuery, tagFromQuery);
        const initialDashboardData = processApiData(matchData, initialFilters, nameFromQuery, tagFromQuery);
        setDashboardData(initialDashboardData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching initial match data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="flex h-screen bg-[#1a0a0e] font-['Barlow_Condensed',sans-serif]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700&display=swap');
      `}</style>
      <SideNavigation isOpen={isSideNavOpen} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={toggleSideNav}
            className="p-2 rounded-md bg-[#171717] text-[#fffbf5] hover:bg-[#53212b] transition-colors duration-200 ease-in-out"
          >
            {isSideNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <label htmlFor="game-mode-select" className="sr-only">Select Game Mode</label>
              <select
                id="game-mode-select"
                className="pl-4 pr-10 py-2 bg-[#171717] text-[#fffbf5] border border-[#53212b] rounded-lg appearance-none focus:outline-none focus:border-[#fd4556]"
                value={filters.mode}
                onChange={(e) => handleFilterChange('mode', e.target.value as GameMode)}
              >
                <option value="competitive">Competitive</option>
                <option value="deathmatch">Deathmatch</option>
                <option value="unrated">Unrated</option>
                <option value="swiftplay">Swiftplay</option
                >
              </select>
              <Filter className="absolute right-3 top-2.5 text-[#53212b]" />
            </div>
            <div className="relative">
            <label htmlFor="game-count-select" className="sr-only">Select Game Count</label>
            <select
                id="game-count-select"
                className="pl-4 pr-10 py-2 bg-[#171717] text-[#fffbf5] border border-[#53212b] rounded-lg appearance-none focus:outline-none focus:border-[#fd4556]"
                value={filters.gameCount}
                onChange={(e) => handleFilterChange('gameCount', parseInt(e.target.value) as GameCount)}
              >
                <option value="1">Last Game</option>
                <option value="5">Last 5 Games</option>
                <option value="10">Last 10 Games</option>
              </select>
              <Filter className="absolute right-3 top-2.5 text-[#53212b]" />
            </div>
          </div>
        </div>

        {/* Render dynamic content based on the active tab */}
        {renderContent()}
      </main>
    </div>
  );
}
