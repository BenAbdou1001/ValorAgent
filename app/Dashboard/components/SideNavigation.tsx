'use client'

import { Home, Users, Crosshair, Map } from 'lucide-react'
import Image from 'next/image';
import imgs from '@public/Logo-removebg-preview.png'
interface SideNavigationProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SIDE_NAV_ITEMS = [
  { id: 'home', name: 'Home', icon: Home },
  { id: 'agents', name: 'Agents', icon: Users },
  { id: 'weapons', name: 'Weapons', icon: Crosshair },
  { id: 'maps', name: 'Maps', icon: Map },
]

export function SideNavigation({ isOpen, activeTab, setActiveTab }: SideNavigationProps) {
  return (
    <nav className={`${isOpen ? 'w-64' : 'w-0'} bg-[#171717] rounded-r-3xl shadow-md overflow-hidden transition-all duration-300 ease-in-out`}>
      <div className="p-6">
        <Image src={imgs} alt="Valoragent Logo" className="w-full h-auto" />
      </div>
      <ul className="mt-6">
        {SIDE_NAV_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-6 py-3 text-left transition-colors duration-200 ease-in-out ${
                  activeTab === item.id ? 'bg-[#fd4556] text-[#fffbf5]' : 'text-[#fffbf5] hover:bg-[#53212b]'
                } uppercase tracking-wide font-semibold`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}