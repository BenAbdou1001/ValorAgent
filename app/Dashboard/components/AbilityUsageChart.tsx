'use client'

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface AbilityUsageChartProps {
  abilityCasts: {
    c_cast: number;
    q_cast: number;
    e_cast: number;
    x_cast: number;
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function AbilityUsageChart({ abilityCasts }: AbilityUsageChartProps) {
  const data = [
    { name: 'C Ability', value: abilityCasts.c_cast },
    { name: 'Q Ability', value: abilityCasts.q_cast },
    { name: 'E Ability', value: abilityCasts.e_cast },
    { name: 'X Ability', value: abilityCasts.x_cast },
  ];

  const totalCasts = Object.values(abilityCasts).reduce((sum, value) => sum + value, 0);

  return (
    <div className="bg-[#171717] p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-[#fffbf5] mb-4">Ability Usage</h3>
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
          <Tooltip
            contentStyle={{ backgroundColor: '#171717', border: '1px solid #53212b' }}
            itemStyle={{ color: '#fffbf5' }}
            formatter={(value: number) => [`${value} (${((value / totalCasts) * 100).toFixed(1)}%)`, 'Casts']}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ color: '#fffbf5' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}