'use client'

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BarChartProps } from '@/types/index'
import { getDataKey } from '@/utils/index'
import { COLORS } from '../../../constants/index'

export function BarChart({ title, data }: BarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-[#171717] p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-[#fffbf5] mb-4 uppercase tracking-wide">{title}</h3>
        <p className="text-[#fffbf5]">No data available</p>
      </div>
    )
  }

  const dataKey = getDataKey(data);

  return (
    <div className="bg-[#171717] p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-[#fffbf5] mb-4 uppercase tracking-wide">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#53212b" />
          <XAxis dataKey={data[0].map ? 'map' : (data[0].rank ? 'rank' : 'name')} stroke="#fffbf5" />
          <YAxis stroke="#fffbf5" />
          <Tooltip
            contentStyle={{ background: '#171717', border: '1px solid #53212b', fontFamily: "'Barlow Condensed', sans-serif" }}
            labelStyle={{ color: '#fffbf5' }}
          />
          <Legend wrapperStyle={{ color: '#fffbf5', fontFamily: "'Barlow Condensed', sans-serif" }} />
          <Bar dataKey={dataKey} fill={COLORS[0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}