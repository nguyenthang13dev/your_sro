"use client";

import { tableAppUserBXHDataType } from "@/interface/auth/User";
import { authService } from "@/services/auth/auth.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function RankingTable()
{

  const [ rankings, setRankings ] = useState<tableAppUserBXHDataType[]>( [] );
  const handleGetBxhIngame = async () =>  {
   try {
      const res = await authService.GetBxhIngame();
      if (res.status)
      {
        setRankings(res.data);
      }
   } catch (error) {
    toast.error( "Lỗi không xác định" ); 
   }
  }
  useEffect( () =>
  {
    handleGetBxhIngame();
  }, [] );
  // Sample ranking data



  return (
    <div className="bg-red-950/60 border border-yellow-900/50 rounded-sm">
      <div className="bg-gradient-to-r from-yellow-900 to-red-900 py-2 px-4">
        <h2 className="text-yellow-500 font-bold">BẢNG XẾP HẠNG</h2>
      </div>

      <div className="p-2">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-2 bg-red-900/60 text-yellow-500 text-sm font-semibold py-1 px-2">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5 text-center">TÊN</div>
          <div className="col-span-3 text-center">SILK</div>
        </div>

        {/* Table rows */}
        <div className="max-h-[220px] overflow-y-auto">
          {rankings.map((player, index) => (
            <div
              key={index}
              className={`grid grid-cols-12 gap-2 text-sm py-1 px-2 border-b border-red-900/30 ${
                index % 2 === 0 ? "bg-red-900/20" : "bg-red-900/10"
              }`}
            >
              <div className="col-span-1 text-center text-yellow-500">{index + 1}</div>
              <div className="col-span-5 text-center text-yellow-500">{player.userNameTk}</div>
              <div className="col-span-3 text-center text-amber-200">{player.silk}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
