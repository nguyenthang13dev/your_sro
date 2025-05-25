import { MilestoneRowProps } from "@/interface/ticnap/tichnap";


const MilestoneRow = ({ id, price, items, onClaim, claimed, available }: MilestoneRowProps) => {
  return (
    <div className="flex w-full mb-2 relative">
      {/* Price column */}
      <div className="w-[120px] bg-[#d9b38c] border-2 border-[#8b5a2b] flex items-center justify-center font-bold text-black text-xl">
        {price}
      </div>

      {/* Items grid */}
      <div className="flex-1 bg-[#d9b38c] border-2 border-[#8b5a2b] border-l-0 flex">
        {items.map((item) => (
          <div
            key={item.key}
            className="w-[60px] h-[60px] border-2 border-[#8b5a2b] m-1 bg-[#333] flex items-center justify-center relative group"
          >
            {item.image && (
              <img
                src={`${process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL}${item.image}` || "/img/"}
                alt={item.name}
                width={50}
                height={50}
                className="object-contain"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200"></div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-0 text-white text-xs text-center translate-y-full group-hover:translate-y-0 group-hover:bg-opacity-70 transition-all duration-200 overflow-hidden">
              {item.name}
            </div>
          </div>
        ))}
      </div>

      {/* Claim button */}
      <button
        className={`w-[120px] bg-[#d9b38c] border-2 border-[#8b5a2b] border-l-0 flex items-center justify-center font-bold text-black ${
          claimed ? "opacity-50 cursor-not-allowed" : available ? "hover:bg-[#c9a37c]" : "opacity-50 cursor-not-allowed"
        }`}
        onClick={() => onClaim(price, id)}
        disabled={claimed || !available}
      >
        Nhận
      </button>

      {/* Overlay for unavailable rewards */}
      {!available && !claimed && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center pointer-events-none">
          <div className="bg-[#8b5a2b] text-white px-3 py-1 rounded-md text-sm font-bold">Chưa đạt mốc</div>
        </div>
      )}

      {/* Claimed overlay */}
      {claimed && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center pointer-events-none">
          <div className="bg-green-700 text-white px-3 py-1 rounded-md text-sm font-bold">Đã nhận</div>
        </div>
      )}
    </div>
  )
}

export default MilestoneRow;
