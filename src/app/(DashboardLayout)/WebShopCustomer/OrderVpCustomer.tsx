import { createOrEdit } from "@/interface/OrderVp/OrderVp";
import { tableWebShopDataType } from "@/interface/WebShop/WebShop";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


interface Props
{
    open: boolean,
    tableSet: tableWebShopDataType | null,
    record?: createOrEdit,
    onClose: () => void
}


const OrderCustomer = (props: Props) =>
{
    const [ showQR, setShowQR ] = useState<boolean>( false );
    

    useEffect( () =>
    {
        setShowQR(props.open)
    }, [props.open])

    return   <Modal
  title="Quét mã QR để thanh toán"
  open={showQR}
  onCancel={props.onClose}
  footer={[
    <Button key="cancel" onClick={props.onClose}>
      Hủy
    </Button>,
    <Button
      key="confirm"
      type="primary"
      onClick={() => {
        toast.success(`Thành công! Vui lòng kiểm tra tài khoản game nhé!Có vấn đề khác liên hệ quản trị để được giúp đỡ`);
        props.onClose()
      }}
    >
      Xác nhận đã thanh toán
    </Button>,
  ]}
>
  <div className="flex flex-col items-center gap-4">
    <img
    src={`https://qr.sepay.vn/img?acc=04028970901&bank=TPBank&amount=${props.record?.total}&des=DVP_${props.record?.id}&download=true`}
      alt="QR Code"
    />
    <text className="text-center">
      Vui lòng quét mã QR để thanh toán bộ <strong>{props.tableSet?.nameSet}</strong>
    </text>
  </div>
</Modal>
}


export default OrderCustomer; 