"use client";

import Link from "next/link";
import styles from "./ranking.module.css"; // ✨ Import CSS module

export function Rankings() {
  const topPlayers = [
    { rank: 1, name: "Jasmine", guild: "500_Thieves", level: 90 },
    { rank: 2, name: "TieuSiro", guild: "500_Thieves", level: 90 },
    { rank: 3, name: "ThangStar", guild: "God_Bot", level: 90 },
    { rank: 4, name: "SatThuTuoi20", guild: "God_Bot", level: 90 },
    { rank: 5, name: "MinhPhuong", guild: "500_Thieves", level: 90 },
    { rank: 6, name: "HoangLan", guild: "God_Bot", level: 90 },
    { rank: 7, name: "Kien", guild: "_TinhAnhEm._", level: 90 },
    { rank: 8, name: "AnhDungStore", guild: "500_Thieves", level: 90 },
    { rank: 9, name: "EoChangHy", guild: "500_Thieves", level: 90 },
    { rank: 10, name: "BoGiai", guild: "_TinhAnhEm._", level: 85 },
  ];

  return (
    <div className="card-items">
      {/* Header */}
      <div className="header-card">
        <h3 className="font-bold text-lg uppercase">Bảng xếp hạng</h3>
      </div>

      {/* Body */}
      <div className="body-card">
        <table className={styles.rankTable}>
          <thead>
            <tr className="bg-amber-900/20 text-sm">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Nhân Vật</th>
              <th className="px-4 py-2 text-left">Guild</th>
              <th className="px-4 py-2 text-left">Cấp</th>
            </tr>
          </thead>
          <tbody>
            {topPlayers.map((player) => (
              <tr key={player.rank} className={`${styles.rankRow} `}>
                <td className="px-4 py-3  font-bold">{player.rank}</td>
                <td className="px-4 py-3  font-medium">{player.name}</td>
                <td className="px-4 py-3 ">{player.guild}</td>
                <td className="px-4 py-3 ">{player.level}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* See more */}
        <div className="p-4 flex justify-center bg-gray-800/50">
          <Link href="/rankings" className={styles.seeMoreBtn}>
            XEM THÊM
          </Link>
        </div>
      </div>
    </div>
  );
}
