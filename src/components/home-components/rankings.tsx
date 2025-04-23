import Image from "next/image"
import Link from "next/link"

export function Rankings() {
  const topPlayers = [
    { rank: 1, name: "DragonSlayer", level: 120, class: "Warrior" },
    { rank: 2, name: "ShadowMage", level: 119, class: "Mage" },
    { rank: 3, name: "PhoenixArcher", level: 118, class: "Archer" },
    { rank: 4, name: "ImmortalKnight", level: 117, class: "Knight" },
    { rank: 5, name: "DarkAssassin", level: 116, class: "Assassin" },
  ]

  return (
    <div className="game-panel">
      <div className="game-panel-header">
        <h2 className="text-center text-amber-300 font-bold text-lg">BẢNG XẾP HẠNG</h2>
      </div>
      <div className="game-panel-content p-4">
        <div className="space-y-2">
          {topPlayers.map((player) => (
            <div key={player.rank} className="flex items-center gap-2 py-2 border-b border-amber-900/30 last:border-0">
              <span className="text-amber-500 font-bold w-6">{player.rank}</span>
              <div className="flex-1">
                <p className="text-amber-200 font-medium">{player.name}</p>
                <p className="text-amber-100/70 text-xs">
                  Level {player.level} {player.class}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Link href="/rankings" className="relative game-button">
            <Image src="/images/button-bg.png" alt="View all rankings" width={150} height={40} />
            <span className="absolute inset-0 flex items-center justify-center text-amber-300 font-medium text-sm">
              XEM THÊM
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
