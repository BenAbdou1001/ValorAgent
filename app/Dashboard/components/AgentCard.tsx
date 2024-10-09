import Image from 'next/image'
import {AgentCardProps} from '../../../types/index'


export function AgentCard({ name }: AgentCardProps) {
    return (
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md group cursor-pointer">
        <Image
          src={`/placeholder.svg?height=400&width=300`}
          alt={`${name} agent`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 transition-all duration-300 group-hover:from-black/90">
          <h3 className="text-[#fffbf5] text-2xl font-semibold text-center w-full transition-transform duration-300 group-hover:translate-y-[-10px]">{name}</h3>
        </div>
        <div className="absolute inset-0 bg-[#fd4556]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>
    )
  }