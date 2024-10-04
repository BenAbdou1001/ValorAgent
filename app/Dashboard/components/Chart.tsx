'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartData } from '@/types/index'
import { ChartProps } from '@/types/index'
import { COLORS } from '../../../constants/index'

export function Chart({ title, data }: ChartProps) {
  return (
    <div className="bg-[#171717] p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-[#fffbf5] mb-4 uppercase tracking-wide">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: '#171717', border: 'none', fontFamily: "'Barlow Condensed', sans-serif" }} />
          <Legend wrapperStyle={{ color: '#fffbf5', fontFamily: "'Barlow Condensed', sans-serif" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}