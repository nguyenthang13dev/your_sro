"use client"

import { UserType } from "@/interface/auth/User"
import { AddItemModelTichNap, milestoneDataType } from "@/interface/ticnap/tichnap"
import { qlLogTicNapService } from "@/services/LogTichNap/LogTichNap.service"
import { orderService } from "@/services/order/order.service"
import { qlSilkTichNapService } from "@/services/SilkTichNap/SilkTichNap.service"
import { useSelector } from "@/store/hooks"
import { Button, Input } from "antd"
import { EditIcon } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import MilestoneRow from "./MiniRow"


function PaymentMilestones() {
  const [totalPayment, setTotalPayment] = useState<number>(0)
  const [claimedRows, setClaimedRows] = useState<Record<string, boolean>>({})
  const [paymentAmount, setPaymentAmount] = useState<string>("")
  const [showConfetti, setShowConfetti] = useState<boolean>(false)

  const [charNames, setCharName] = useState<string>("")
   const userInfo: UserType | null = useSelector((state) => state.auth.User);

  
  const [milestoneData, setmilestoneData] = useState<milestoneDataType[]>([]);
  const [additem, setAddItem] = useState<AddItemModelTichNap>()

  const router = useRouter()

  const handleClaim = async ( price: string, id: string ) =>
  {
    try
    {
      if ( charNames == "" )
      {
        toast.error("Yêu cầu nhập đúng tên nhân vật để nhận vật phẩm")
        return;
      }
      const res = await qlSilkTichNapService.AddItemForReach({
        itemTichNap: id,
        charNames: charNames,
        userName: userInfo?.userName ?? ""
      } );  
      if ( res )
      {
        toast.success( `Đã nhận phần thưởng mốc nạp: ${price}` ) 
        handleLogTichNap()
      }
    } catch ( err )
    {
      toast.error( "Nhận quà không thành công" );
    }
  }

  const handleAddPayment = () => {
    router.push('/payment')
  }

  const handleGetmilestoneData = async () =>
  {
    try {
      const data = await qlSilkTichNapService.GetRank();
      if ( data.status )
      {
        setmilestoneData( data.data );
      }
    } catch (error) {
      toast.error( "Có lỗi xảy ra trong quá trình xử lý" );
    }
  }

  const handleGetPayMent = async () =>
  {
    try
    {
      const user :string= userInfo?.userName ?? "";
      const response = await orderService.GetTotalMoney(user);
      if ( response.status )
      {
        setTotalPayment( response.data );
      }
    } catch (error) {
      toast.error("Lấy dữ liệu không thành công")
    }
  }



    const handleLogTichNap = async () =>
  {
    try
    {
      const user :string= userInfo?.userName ?? "";
      const response = await qlLogTicNapService.GetLogByUser(user);
      if ( response.status )
      {
        const mapped: Record<string, boolean> = {};
        response.data.forEach((item: { idItem: string; isActive: boolean }) => {
          mapped[item.idItem] = item.isActive;
        } );
        setClaimedRows(mapped);
      }

    } catch (error) {
      toast.error("Lấy dữ liệu không thành công")
    }
  }

  // Find the next milestone
  const nextMilestone = milestoneData.find((milestone) => milestone.priceValue > totalPayment)
  const progressToNext = nextMilestone ? (totalPayment / nextMilestone.priceValue) * 100 : 100


  
  useEffect( () =>
  {
    handleGetPayMent()
    handleGetmilestoneData();
    handleLogTichNap();
  }, [])
  
  return (
    <div className="max-w-4xl mx-auto p-4 bg-[#e6c9a8] border-4 border-[#8b5a2b]">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#8b5a2b]">Phần Thưởng Mốc Nạp</h1>

      {/* Payment status */}
      <div className="bg-[#d9b38c] border-2 border-[#8b5a2b] p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-[#8b5a2b]">Tổng tiền đã nạp:</span>
          <span className="font-bold text-xl text-[#8b5a2b]">{totalPayment.toLocaleString("vi-VN")} VND</span>
        </div>

        {nextMilestone && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Mốc tiếp theo: {nextMilestone.price} VND</span>
              <span>
                {totalPayment.toLocaleString("vi-VN")} / {nextMilestone.priceValue.toLocaleString("vi-VN")} VND
              </span>
            </div>
            {/* <Progress value={progressToNext} className="h-2" /> */}
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleAddPayment}>
            <EditIcon />
            Nạp thêm tiền
          </Button>


          <div>
            <Input placeholder="Nhập tên nhân vật" name="CharName" onChange={( e ) =>
            {
              setCharName( e.target.value )
            }} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {milestoneData.map((milestone, index) => (
          <MilestoneRow
            key={index}
            id={milestone?.id}
            price={milestone.price}
            items={milestone.items}
            onClaim={handleClaim}
            claimed={claimedRows[milestone.id] || false}
            available={totalPayment >= milestone.priceValue}
          />
        ))}
      </div>

      {/* Confetti effect when claiming rewards */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-5%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PaymentMilestones