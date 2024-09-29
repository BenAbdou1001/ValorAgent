'use client'
import { CardProps } from '@/types/index'

export function Card({ title, content }: CardProps) {
  return (
    <div className="bg-[#171717] p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-[#fffbf5] mb-4 uppercase tracking-wide">{title}</h3>
      {content}
    </div>
  )
}