"use client";
import Flex from "@/components/shared-components/Flex";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import withAuthorization from "@/libs/authentication";
import { giftCodeService } from "@/services/GiftCode/giftCode.service";
import { setIsLoading } from "@/store/general/GeneralSlice";
import { useSelector } from "@/store/hooks";
import { AppDispatch } from "@/store/store";
import { GiftOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Input, Space, Typography } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const { Title, Paragraph, Text } = Typography

const GiftCodeInput: React.FC = () =>  {
    const [ giftCode, setGiftCode ] = useState( "" )
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const dispatch = useDispatch<AppDispatch>()
  const [CurrentUser, setCurrentUser] = useState("");
    const loading = useSelector((state) => state.general.isLoading)

    const handleSubmit = async () =>
    {
    if (!giftCode.trim()) {
      setStatus("error")
      return
    }
        dispatch( setIsLoading( true ) )
    try
    {

          const res = await giftCodeService.AddGiftCodeForPlayer({
            giftCode: giftCode,
            charNames: [CurrentUser ?? ""]
          });
    
          if (res.status) {
            toast.success("Nhập giftcode thành công!");
          } else {
            toast.error("Nhập giftcode thất bại.");
          }
        } catch (err) {
         toast.error( "Lỗi khi gán giftcode." );
      
    } finally
    {
        dispatch( setIsLoading( false ) )
        }
    
  }

  return (
    <Flex>
      <AutoBreadcrumb />
      <Card
        className="max-w-md mx-auto"
        title={
          <div className="flex items-center gap-2">
            <GiftOutlined className="text-rose-500" />
            <span>Nhập mã quà tặng</span>
          </div>
        }
      >
        <Space direction="vertical" size="large" className="w-full">
          <div>
            <Title level={4}>Đổi mã quà tặng</Title>
            <Paragraph>
              Nhập mã quà tặng của bạn để nhận phần thưởng, ưu đãi hoặc vật phẩm đặc biệt. Mã có thể được cung cấp qua các chương trình khuyến mãi, sự kiện, hoặc khi mua hàng.
            </Paragraph>
          </div>

          <div>
            <Title level={5}>Hướng dẫn sử dụng mã:</Title>
            <Paragraph>
              <ol className="pl-5">
                <li>Nhấn nút để xác nhận mã</li>
                <li>Phần thưởng sẽ được thêm vào tài khoản của bạn nếu mã hợp lệ</li>
              </ol>
            </Paragraph>
          </div>

          <div className="space-y-4">

              <div className="space-y-4">
            
              <Input placeholder="Nhập tên nhân vật của bạn" onChange={( e ) =>
              {
                setCurrentUser( e.target.value );
              }} />
            </div>
            
            <div>
              <Text strong>Nhập mã quà tặng:</Text>
              <Input
                placeholder="ví dụ: GIFT-1234-ABCD"
                value={giftCode}
                onChange={(e) => {
                  setGiftCode(e.target.value)
                  if (status !== "idle") setStatus("idle")
                }}
                onPressEnter={handleSubmit}
                className="mt-2"
                maxLength={20}
              />
            </div>


          

            {status === "success" && (
              <Alert
                message="Thành công!"
                description="Mã quà tặng của bạn đã được đổi thành công."
                type="success"
                showIcon
              />
            )}

            {status === "error" && (
              <Alert
                message="Mã không hợp lệ"
                description="Mã bạn nhập không hợp lệ hoặc đã được sử dụng."
                type="error"
                showIcon
              />
            )}

            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              className="bg-rose-500 hover:bg-rose-600"
              block
            >
              Đổi mã
            </Button>
          </div>
        </Space>
      </Card>
    </Flex>
  )
}
export default withAuthorization(GiftCodeInput, '')
