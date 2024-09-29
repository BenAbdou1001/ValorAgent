'use client'
import Image from "next/image";
import { Home, Users, Crosshair, UserCircle } from 'lucide-react'
import { SIDE_NAV_ITEMS } from '../../../constatns/index'
import { SideNavigationProps } from '@/types/index'
import Logo from '../../../public/Logo-removebg-preview.png'

const iconMap = {
  Home,
  Users,
  Crosshair,
  UserCircle,
}

export function SideNavigation({ isOpen, activeTab, setActiveTab }: SideNavigationProps) {
  return (
    <nav className={`${isOpen ? 'w-64' : 'w-0'} bg-[#171717] rounded-r-3xl shadow-md overflow-hidden transition-all duration-300 ease-in-out`}>
      <div className="p-6">
        <Image src={Logo} alt="Valoragent Logo" className="w-full h-auto" />
      </div>
      <ul className="mt-6">
        {SIDE_NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap]
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