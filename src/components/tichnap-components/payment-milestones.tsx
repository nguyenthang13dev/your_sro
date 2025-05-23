"use client"

import { Button, Input } from "antd"
import Image from "next/image"
import { useState } from "react"


interface ItemType {
  id: number
  name: string
  image: string
}

interface MilestoneRowProps {
  price: string
  items: ItemType[]
  onClaim: (price: string) => void
  claimed: boolean
  available: boolean
}

const MilestoneRow = ({ price, items, onClaim, claimed, available }: MilestoneRowProps) => {
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
            key={item.id}
            className="w-[60px] h-[60px] border-2 border-[#8b5a2b] m-1 bg-[#333] flex items-center justify-center relative group"
          >
            {item.image && (
              <Image
                src={item.image || "/placeholder.svg"}
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
        onClick={() => onClaim(price)}
        disabled={claimed || !available}
      >
        nhận
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

export default function PaymentMilestones() {
  const [totalPayment, setTotalPayment] = useState<number>(0)
  const [claimedRows, setClaimedRows] = useState<Record<string, boolean>>({})
  const [paymentAmount, setPaymentAmount] = useState<string>("")
  const [showConfetti, setShowConfetti] = useState<boolean>(false)

  // Sample data for the milestone rewards
  const milestoneData = [
    {
      price: "98.000",
      priceValue: 98000,
      items: Array(6)
        .fill(0)
        .map((_, i) => ({
          id: i,
          name: `Vật phẩm cơ bản ${i + 1}`,
          image: `/placeholder.svg?height=50&width=50&text=${i + 1}`,
        })),
    },
    {
      price: "250.000",
      priceValue: 250000,
      items: Array(6)
        .fill(0)
        .map((_, i) => ({
          id: i + 10,
          name: `Vật phẩm hiếm ${i + 1}`,
          image: `/placeholder.svg?height=50&width=50&text=${i + 10}`,
        })),
    },
    {
      price: "498.000",
      priceValue: 498000,
      items: Array(6)
        .fill(0)
        .map((_, i) => ({
          id: i + 20,
          name: `Vật phẩm cao cấp ${i + 1}`,
          image: `/placeholder.svg?height=50&width=50&text=${i + 20}`,
        })),
    },
    {
      price: "999.000",
      priceValue: 999000,
      items: Array(6)
        .fill(0)
        .map((_, i) => ({
          id: i + 30,
          name: `Vật phẩm đặc biệt ${i + 1}`,
          image: `/placeholder.svg?height=50&width=50&text=${i + 30}`,
        })),
    },
    {
      price: "1.500.000",
      priceValue: 1500000,
      items: Array(6)
        .fill(0)
        .map((_, i) => ({
          id: i + 40,
          name: `Vật phẩm VIP ${i + 1}`,
          image: `/placeholder.svg?height=50&width=50&text=${i + 40}`,
        })),
    },
    {
      price: "2.000.000",
      priceValue: 2000000,
      items: Array(6)
        .fill(0)
        .map((_, i) => ({
          id: i + 50,
          name: `Vật phẩm siêu hiếm ${i + 1}`,
          image: `/placeholder.svg?height=50&width=50&text=${i + 50}`,
        })),
    },
    {
      price: "3.000.000",
      priceValue: 3000000,
      items: [
        {
          id: 60,
          name: "Vật phẩm độc quyền",
          image: `/placeholder.svg?height=50&width=50&text=VIP`,
        },
        ...Array(5)
          .fill(0)
          .map((_, i) => ({
            id: i + 61,
            name: "",
            image: "",
          })),
      ],
    },
    {
      price: "5.000.000",
      priceValue: 5000000,
      items: [
        {
          id: 70,
          name: "Vật phẩm giới hạn",
          image: `/placeholder.svg?height=50&width=50&text=LIM`,
        },
        ...Array(5)
          .fill(0)
          .map((_, i) => ({
            id: i + 71,
            name: "",
            image: "",
          })),
      ],
    },
    {
      price: "10.000.000",
      priceValue: 10000000,
      items: [
        {
          id: 80,
          name: "Vật phẩm huyền thoại",
          image: `/placeholder.svg?height=50&width=50&text=LEG`,
        },
        ...Array(5)
          .fill(0)
          .map((_, i) => ({
            id: i + 81,
            name: "",
            image: "",
          })),
      ],
    },
    {
      price: "20.000.000",
      priceValue: 20000000,
      items: Array(6)
        .fill(0)
        .map((_, i) => ({
          id: i + 90,
          name: `Vật phẩm thần thoại ${i + 1}`,
          image: `/placeholder.svg?height=50&width=50&text=${i + 90}`,
        })),
    },
  ]

  const handleClaim = (price: string) => {
    setClaimedRows((prev) => ({
      ...prev,
      [price]: true,
    }))
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
    alert(`Đã nhận phần thưởng mốc nạp: ${price}`)
  }

  const handleAddPayment = () => {
    const amount = Number.parseInt(paymentAmount)
    if (!isNaN(amount) && amount > 0) {
      setTotalPayment((prev) => prev + amount)
      setPaymentAmount("")
      alert(`Đã nạp thành công: ${amount.toLocaleString("vi-VN")} VND`)
    } else {
      alert("Vui lòng nhập số tiền hợp lệ")
    }
  }

  // Find the next milestone
  const nextMilestone = milestoneData.find((milestone) => milestone.priceValue > totalPayment)
  const progressToNext = nextMilestone ? (totalPayment / nextMilestone.priceValue) * 100 : 100

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
          <Input
            type="number"
            placeholder="Nhập số tiền nạp"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="bg-white"
          />
          <Button onClick={handleAddPayment} className="bg-[#8b5a2b] hover:bg-[#6d4522]">
            Nạp tiền
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {milestoneData.map((milestone, index) => (
          <MilestoneRow
            key={index}
            price={milestone.price}
            items={milestone.items}
            onClaim={handleClaim}
            claimed={claimedRows[milestone.price] || false}
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
