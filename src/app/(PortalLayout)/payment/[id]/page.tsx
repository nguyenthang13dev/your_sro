"use client"

import type { tableOrderCreateVMDataType } from "@/interface/Order/Order"
import { orderService } from "@/services/order/order.service"
import { ArrowDownToLine, RefreshCw } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const PaymentPage = () => {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [order, setOrder] = useState<tableOrderCreateVMDataType | null>(null)
  const [loading, setLoading] = useState(true)

  const handleGetDtos = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const response = await orderService.GetDtos(id)
      if (response.status) {
        setOrder(response.data)
      } else {
        console.error("Error fetching order data")
      }
    } catch (error) {
      console.error("Error fetching order data", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!id) return
    handleGetDtos(id)
  }, [id, handleGetDtos])

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <RefreshCw className="w-8 h-8 animate-spin text-gray-500" />
        <span className="ml-2">Đang tải...</span>
      </div>
    )

  if (!order)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Không tìm thấy đơn hàng</p>
      </div>
    )

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-sm">
      <div className="text-center text-sm mb-4 text-gray-700">
        <p>Hãy chỉ thanh toán sau khi chuyển khoản ngân hàng</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="flex flex-col items-center bg-gray-50 p-2 rounded">
          <p className="text-center mb-1">Cách 1: Mở app ngân hàng để quét mã QR</p>
          <ArrowDownToLine className="w-4 h-4 text-gray-500" />
        </div>
        <div className="flex flex-col items-center bg-gray-50 p-2 rounded">
          <p className="text-center mb-1">Cách 2: Chuyển khoản theo thông tin dưới đây</p>
          <ArrowDownToLine className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      <div className="flex justify-center gap-8 mb-4">
        <div className="flex flex-col items-center">
          <Image src="/placeholder.svg?height=30&width=80" width={80} height={30} alt="SePay" className="mb-1" />
        </div>
        <div className="flex flex-col items-center">
          <Image src="/placeholder.svg?height=30&width=80" width={80} height={30} alt="MB Bank" className="mb-1" />
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <img
          src={`https://qr.sepay.vn/img?acc=04028970901&bank=TPBank&amount=${order.total}&des=DH_${order.id}&download=true`}
          width={200}
          height={200}
          alt="QR Code"
          className="border p-2 rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <div className="text-right text-gray-600">Chủ tài khoản:</div>
        <div className="font-medium">TRAN DUC LINH
</div>

        <div className="text-right text-gray-600">Số tài khoản:</div>
        <div className="font-medium">04028970901</div>

        <div className="text-right text-gray-600">Ngân hàng:</div>
        <div className="font-medium">ACB</div>

        <div className="text-right text-gray-600">Số tiền:</div>
        <div className="font-medium">{order.total.toLocaleString()}đ</div>

        <div className="text-right text-gray-600">Nội dung CK:</div>
        <div className="font-medium">DH_{order.id}</div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-4 border-t pt-2">
        <p>Lưu ý: Để được ghi nhận đơn hàng đúng, quý khách vui lòng nhập đúng nội dung chuyển khoản</p>
      </div>

      <div className="flex justify-center items-center mt-4">
        <RefreshCw className="w-4 h-4 text-gray-500 mr-2" />
        <span className="text-sm text-gray-600">Trạng thái: Chờ thanh toán</span>
      </div>
    </div>
  )
}

export default PaymentPage
