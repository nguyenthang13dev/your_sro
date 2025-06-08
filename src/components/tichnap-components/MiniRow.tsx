import { MilestoneRowProps } from "@/interface/ticnap/tichnap";

const MilestoneRow = ({ id, price, items, onClaim, claimed, available }: MilestoneRowProps) => {
  return (
    <div className="flex w-full mb-2 relative">
      {/* Price column */}
      <div className="w-[120px] bg-[#d9b38c] border-2 border-[#8b5a2b] flex items-center justify-center font-bold text-black text-xl">
        {price}
      </div>

      {/* Items grid */}
      <div className="flex-1 bg-[#d9b38c] border-2 border-[#8b5a2b] border-l-0 flex flex-wrap p-1 gap-2">
        {items.map((item) => (
          <div
            key={item.key}
            className="w-[70px] h-[90px] bg-[#333] border-2 border-[#8b5a2b] flex flex-col items-center justify-center text-white text-[10px] text-center p-1"
          >
            {item.image && (
              <img
                src={`${process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL}${item.image}` || "/img/"}
                alt={item.name}
                width={60}
                height={60}
                className="object-contain mb-1"
              />
            )}
            <span>{item.name}</span>
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
  );
};

export default MilestoneRow;
