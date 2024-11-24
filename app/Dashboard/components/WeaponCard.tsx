interface ValorantCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

export function WeaponCard({ name, image, onClick }: ValorantCardProps) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-md group cursor-pointer"
        onClick={onClick}
    >
      <img
        src={image}
        alt={`${name} weapon`}
        className="transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 transition-all duration-300 group-hover:from-black/90">
        <h3 className="text-[#fffbf5] text-2xl font-semibold text-center w-full transition-transform duration-300 group-hover:translate-y-[-10px]">{name}</h3>
      </div>
      <div className="absolute inset-0 bg-[#fd4556]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </div>
  )
}