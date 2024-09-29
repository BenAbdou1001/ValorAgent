'use client'

import { useState } from 'react'
import { Search, Filter, Menu, X } from 'lucide-react'
import { SideNavigation } from './SideNavigation'
import { FILTER_OPTIONS } from '../../../constatns/index'

interface DashboardClientProps {
  children: React.ReactNode;
}

export function DashboardClient({ children }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all_time')
  const [isSideNavOpen, setIsSideNavOpen] = useState(true)

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen)
  }

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
        <h2 className="text-4xl font-bold text-[#fffbf5] mb-6 uppercase tracking-wide">Welcome back, Agent!</h2>
        {children}
      </main>
    </div>
  )
}