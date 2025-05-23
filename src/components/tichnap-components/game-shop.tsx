"use client"

import Image from "next/image"
import { useState } from "react"

interface ItemType {
  id: number
  name: string
  image: string
}

interface ItemRowProps {
  price: string
  items: ItemType[]
  onClaim: (price: string) => void
  claimed: boolean
}

const ItemRow = ({ price, items, onClaim, claimed }: ItemRowProps) => {
  return (
    <div className="flex w-full mb-2">
      {/* Price column */}
      <div className="w-[120px] bg-[#d9b38c] border-2 border-[#8b5a2b] flex items-center justify-center font-bold text-black text-xl">
        {price}
      </div>

      {/* Items grid */}
      <div className="flex-1 bg-[#d9b38c] border-2 border-[#8b5a2b] border-l-0 flex">
        {items.map((item) => (
          <div
            key={item.id}
            className="w-[60px] h-[60px] border-2 border-[#8b5a2b] m-1 bg-[#333] flex items-center justify-center"
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
          </div>
        ))}
      </div>

      {/* Claim button */}
      <button
        className={`w-[120px] bg-[#d9b38c] border-2 border-[#8b5a2b] border-l-0 flex items-center justify-center font-bold text-black ${claimed ? "opacity-50" : "hover:bg-[#c9a37c]"}`}
        onClick={() => onClaim(price)}
        disabled={claimed}
      >
        nhận
      </button>
    </div>
  )
}

export default function GameShop() {
  const [claimedRows, setClaimedRows] = useState<Record<string, boolean>>({})

  // Sample data for the shop items
  const shopData = [
    {
      price: "98.000",
      items: Array(6)
        .fill(0)
        .map((_, i) => ({
          id: i,
          name: `Item ${i + 1}`,
          image: `/placeholder.svg?height=50&width=50&text=${i + 1}`,
        })),
    },
    {
      price: "250.000",
      items: Array(6)
        .fill(0)
        .map((_, i) => ({
          id: i + 10,
          name: `Item ${i + 10}`,
          image: `/placeholder.svg?height=50&width=50&text=${i + 10}`,
        })),
    },
    {
      price: "498.000",
      items: Array(6)
        .fill(0)
        .map((_, i) => ({
          id: i + 20,
          name: `Item ${i + 20}`,
          image: `/placeholder.svg?height=50&width=50&text=${i + 20}`,
        })),
    },
    {
      price: "999.000",
      items: Array(6)
        .fill(0)
        .map((_, i) => ({
          id: i + 30,
          name: `Item ${i + 30}`,
          image: `/placeholder.svg?height=50&width=50&text=${i + 30}`,
        })),
    },
    {
      price: "",
      items: Array(6)
        .fill(0)
        .map((_, i) => ({
          id: i + 40,
          name: `Item ${i + 40}`,
          image: `/placeholder.svg?height=50&width=50&text=${i + 40}`,
        })),
    },
    {
      price: "",
      items: Array(6)
        .fill(0)
        .map((_, i) => ({
          id: i + 50,
          name: `Item ${i + 50}`,
          image: `/placeholder.svg?height=50&width=50&text=${i + 50}`,
        })),
    },
    {
      price: "",
      items: [
        {
          id: 60,
          name: "Special Item 1",
          image: `/placeholder.svg?height=50&width=50&text=S1`,
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
      price: "",
      items: [
        {
          id: 70,
          name: "Special Item 2",
          image: `/placeholder.svg?height=50&width=50&text=S2`,
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
      price: "",
      items: [
        {
          id: 80,
          name: "Special Item 3",
          image: `/placeholder.svg?height=50&width=50&text=S3`,
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
      price: "",
      items: Array(6)
        .fill(0)
        .map((_, i) => ({
          id: i + 90,
          name: `Item ${i + 90}`,
          image: `/placeholder.svg?height=50&width=50&text=${i + 90}`,
        })),
    },
  ]

  const handleClaim = (price: string) => {
    setClaimedRows((prev) => ({
      ...prev,
      [price]: true,
    }))
    alert(`Đã nhận phần thưởng: ${price}`)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-[#e6c9a8] border-4 border-[#8b5a2b]">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#8b5a2b]">Cửa Hàng Vật Phẩm</h1>

      <div className="space-y-2">
        {shopData.map((row, index) => (
          <ItemRow
            key={index}
            price={row.price}
            items={row.items}
            onClaim={handleClaim}
            claimed={claimedRows[row.price]}
          />
        ))}
      </div>
    </div>
  )
}
