"use client";

import { tableAppUserBXHDataType } from "@/interface/auth/User";
import { authService } from "@/services/auth/auth.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const formatGold = (value: number): string => {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return value.toString();
};


export default function RankingTableIn() {
  const [rankings, setRankings] = useState<tableAppUserBXHDataType[]>([]);
  const handleGetBxhIngame = async () => {
    try {
      const res = await authService.GetBxhGoldGame();
      if (res.status) {
        setRankings(res.data);
      }
    } catch (error) {
      toast.error("Lỗi không xác định");
    }
  };
  useEffect(() => {
    handleGetBxhIngame();
  }, []);
  // Sample ranking data

  return (
    <div className="bg-red-950/60 border border-yellow-900/50 rounded-sm mh-300-rank">
      <div className="bg-gradient-to-r from-yellow-900 to-red-900 py-2 px-4">
        <h2 className="text-yellow-500 font-bold">BẢNG XẾP HẠNG GOLD</h2>
      </div>

      <div className="p-2">
     <div className="grid grid-cols-12 gap-1 bg-red-900/60 text-yellow-500 text-sm font-semibold py-1 px-2">
  <div className="col-span-1 text-center">#</div>
  <div className="col-span-6 text-left pl-2">PLAYER</div>
  <div className="col-span-5 text-right pr-2">GOLD</div>
</div>

{/* Table rows */}
<div className="overflow-y-auto">
  {rankings.map((player, index) => (
    <div
      key={index}
      className={`grid grid-cols-12 gap-1 text-sm py-1 px-2 border-b border-red-900/30 ${
        index % 2 === 0 ? "bg-red-900/20" : "bg-red-900/10"
      }`}
    >
      <div className="col-span-1 text-center text-yellow-500">{index + 1}</div>
      <div className="col-span-6 text-left text-yellow-500 pl-2">
        {player.userNameTk}
      </div>
      <div className="col-span-5 text-right text-amber-200 pr-2">
        {formatGold(player.silk)}
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}
