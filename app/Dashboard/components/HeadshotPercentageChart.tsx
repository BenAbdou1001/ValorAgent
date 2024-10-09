import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface HeadshotPercentageChartProps {
  headshotPercentage: number;
  bodyshotPercentage: number;
  legshotPercentage: number;
}

const COLORS = ['#fd4556', '#53212b', '#171717'];

export function HeadshotPercentageChart({ headshotPercentage, bodyshotPercentage, legshotPercentage }: HeadshotPercentageChartProps) {
  const data = [
    { name: 'Headshots', value: Math.round(headshotPercentage) },
    { name: 'Bodyshots', value: Math.round(bodyshotPercentage) },
    { name: 'Legshots', value: Math.round(legshotPercentage) },
  ];

  return (
    <div className="bg-[#171717] p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-[#fffbf5] mb-4">Shot Distribution</h3>
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
            formatter={(value: number) => `${value}%`}
          />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ color: '#fffbf5' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}