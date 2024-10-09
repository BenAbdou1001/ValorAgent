import React from 'react'
import { DashboardClient } from './components/DashboardClient'
import { FilterOptions } from '../../types/index'

export default async function DashboardPage() {

  const initialFilters: FilterOptions = {
    mode: 'competitive',
    gameCount: 5,
  };

  // You can pass the fetched data directly to the client component
  return (
    <DashboardClient
      initialFilters={initialFilters}
    />
  )
}
