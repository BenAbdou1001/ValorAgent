'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams from Next.js
import { Search, Filter, Menu, X } from 'lucide-react';
import { SideNavigation } from './SideNavigation';
import { FILTER_OPTIONS } from '../../../constants/index';
import { GameMode } from '../../../types/index';

interface DashboardClientProps {
  homeContentByMode: {
    [key in GameMode]: React.ReactNode;
  };
  agentsContent: React.ReactNode;
  weaponsContent: React.ReactNode;
  mapsContent: React.ReactNode;
}

export function DashboardClient({ homeContentByMode, agentsContent, weaponsContent, mapsContent }: DashboardClientProps) {
  const searchParams = useSearchParams(); // Use the useSearchParams hook
  const query = searchParams?.get('query') || ''; // Get the query parameter
  const [activeTab, setActiveTab] = useState('home');
  const [activeGameMode, setActiveGameMode] = useState<GameMode>('competitive');
  const [searchQuery, setSearchQuery] = useState(query); // Initialize with query param
  const [accountName, setAccountName] = useState('');
  const [filter, setFilter] = useState('all_time');
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);

  useEffect(() => {
    // Update searchQuery whenever the router's query changes
    setSearchQuery(query);
    
    // Assuming the accountName is passed as a query parameter called "accountName"
    const nameFromQuery = searchParams?.get('accountName') || '';
    setAccountName(nameFromQuery);
}, [query]); // Dependency on query


  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <div className="mb-6">
              <GameModeTabs activeGameMode={activeGameMode} setActiveGameMode={setActiveGameMode} />
            </div>
            {homeContentByMode[activeGameMode]}
          </>
        );
      case 'agents':
        return agentsContent;
      case 'weapons':
        return weaponsContent;
      case 'maps':
        return mapsContent;
      default:
        return homeContentByMode[activeGameMode];
    }
  };

  return (
    <div className="flex h-screen bg-[#1a0a0e] font-['Barlow_Condensed',sans-serif]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700&display=swap');
      `}</style>
      <SideNavigation isOpen={isSideNavOpen} activeTab={activeTab} setActiveTab={setActiveTab} />

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
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-[#171717] text-[#fffbf5] border border-[#53212b] rounded-lg focus:outline-none focus:border-[#fd4556]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-[#53212b]" />
            </div>
            <div className="relative">
              <label htmlFor="filter-select" className="sr-only">Filter Options</label>
              <select
                id="filter-select"
                className="pl-4 pr-10 py-2 bg-[#171717] text-[#fffbf5] border border-[#53212b] rounded-lg appearance-none focus:outline-none focus:border-[#fd4556]"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {FILTER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-2.5 text-[#53212b]" />
            </div>
          </div>
        </div>
        <h2 className="text-4xl font-bold text-[#fffbf5] mb-6 uppercase tracking-wide">
        Welcome back, {accountName || "Agent"}!
        </h2>
        {renderContent()}
      </main>
    </div>
  );
}

interface GameModeTabsProps {
  activeGameMode: GameMode;
  setActiveGameMode: (gameMode: GameMode) => void;
}

function GameModeTabs({ activeGameMode, setActiveGameMode }: GameModeTabsProps) {
  const gameModes: GameMode[] = ['competitive', 'deathmatch', 'teamDeathmatch', 'spikeRush'];

  return (
    <div className="flex space-x-2">
      {gameModes.map((mode) => (
        <button
          key={mode}
          onClick={() => setActiveGameMode(mode)}
          className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ease-in-out ${
            activeGameMode === mode
              ? 'bg-[#fd4556] text-[#fffbf5]'
              : 'bg-[#171717] text-[#fffbf5] hover:bg-[#53212b]'
          }`}
        >
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </button>
      ))}
    </div>
  );
}
