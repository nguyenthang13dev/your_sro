export default function RankingTable() {
  // Sample ranking data
  const rankings = [
    { rank: 1, name: "1", level: 120, power: 9999999 },
    { rank: 2, name: "2", level: 119, power: 9850000 },
    { rank: 3, name: "3", level: 118, power: 9720000 },
    { rank: 4, name: "4", level: 117, power: 9650000 },
    { rank: 5, name: "5", level: 116, power: 9540000 },
    { rank: 6, name: "6", level: 115, power: 9430000 },
    { rank: 7, name: "7", level: 114, power: 9320000 },
    { rank: 8, name: "8", level: 113, power: 9210000 },
  ]

  return (
    <div className="bg-red-950/60 border border-yellow-900/50 rounded-sm">
      <div className="bg-gradient-to-r from-yellow-900 to-red-900 py-2 px-4">
        <h2 className="text-yellow-500 font-bold">BẢNG XẾP HẠNG</h2>
      </div>

      <div className="p-2">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-2 bg-red-900/60 text-yellow-500 text-sm font-semibold py-1 px-2">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5">TÊN</div>
          <div className="col-span-3 text-center">CẤP</div>
          <div className="col-span-3 text-center">LỰC</div>
        </div>

        {/* Table rows */}
        <div className="max-h-[300px] overflow-y-auto">
          {rankings.map((player, index) => (
            <div
              key={index}
              className={`grid grid-cols-12 gap-2 text-sm py-1 px-2 border-b border-red-900/30 ${
                index % 2 === 0 ? "bg-red-900/20" : "bg-red-900/10"
              }`}
            >
              <div className="col-span-1 text-center text-yellow-500">{player.rank}</div>
              <div className="col-span-5 text-amber-200">{player.name}</div>
              <div className="col-span-3 text-center text-amber-200">{player.level}</div>
              <div className="col-span-3 text-center text-amber-200">{player.power.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
