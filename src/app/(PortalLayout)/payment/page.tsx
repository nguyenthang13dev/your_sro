"use client"
import { searchConfigSilkDataType, tableConfigSilk } from "@/interface/ConfigSilk/ConfigSilk"
import { tableOrderCreateVMDataType } from "@/interface/Order/Order"
import { authService } from "@/services/auth/auth.service"
import { configSilkService } from "@/services/ConfigSilk/ConfigSilk.service"
import { orderService } from "@/services/order/order.service"
import { FormatVND } from "@/utils/FormatMoney"
import { Button, Card, ConfigProvider, Form, Input, Radio, Space, Typography } from "antd"
import { GamepadIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

const { Title, Text } = Typography

export default function GameTopupForm() {
    const [form] = Form.useForm()
    const [denominations, setDemominations] = useState<tableConfigSilk[]>([]);
    // Hàm kiểm tra tài khoản game có tồn tại hay không

    const router = useRouter();

    const handleCheckAccount = async ( username: string ): Promise<boolean> => {
        try {
            const response = await authService.checkAccount( username );
            if ( response.status) {
                return response.data;
            } else
            {
                return false;
            }
        } catch (error) {
            return false;            
        }

    }


    const handleAddOrder = async ( values: tableOrderCreateVMDataType ) =>
    {
        try {
            const response = await orderService.Create(values);
            if ( response.status) {
                return response.data;
            } else
            {
                return false;
            }
        } catch (error) {
            return false;            
        }
    }

    const handleSubmit = async ( values: any ) =>
    {
         console.log("order", form.getFieldsValue()) ;

        const ResponseCheck = await handleCheckAccount( values.username );
        if ( !ResponseCheck ) {
            toast.error("Tài khoản không tồn tại hoặc không hợp lệ!" );
            return;
        }
        // Tạo 1 order theo giá trị 
        const order: tableOrderCreateVMDataType = {
             name: 'ORD' + '-' + Date.now() + '-' + values.username,
            total: Number(values.amount),
        }
        
        const ResponseOrder = await handleAddOrder( order );
        if ( !ResponseOrder ) {
            toast.error("Đặt hàng không thành công!" );
            return;
        } else
        {
            toast.success( "Đặt hàng thành công!" );
            setTimeout( () =>
            {
                 router.push( `/payment/${ResponseOrder.id}` );
            }, 1200);
        }

    // alert(`Đặt hàng thành công!\nTài khoản: ${values.username}\nSố tiền: ${values.amount} VND`)
    }
    


    const handleGetConfigSilk = useCallback(async () => {
        try
        {
            const search : searchConfigSilkDataType = {
                pageIndex: 1,
                pageSize: 10000,
            }
            // Gọi API để lấy danh sách mệnh giá nạp tiền
            const response = await configSilkService.GetData(search)
            if ( response.status) {
                setDemominations(response.data.items);
                return response.data.items;
            } else
            {
                return false;
            }
        }
        catch (error) {
            return false;            
        }
    }, [])

  // Tùy chỉnh theme cho Ant Design
  const theme = {
    token: {
      colorPrimary: "#EAB308", // yellow-500
      colorPrimaryHover: "#CA8A04", // yellow-600
      colorBgContainer: "#7F1D1D", // red-900
      colorText: "#FEF9C3", // yellow-100
      colorBorder: "#B91C1C", // red-700
      borderRadius: 8,
    },
    components: {
      Card: {
        colorBgContainer: "#7F1D1D", // red-900
        colorBorderSecondary: "#B91C1C", // red-700
      },
      Radio: {
        colorPrimary: "#EAB308", // yellow-500
        colorBgContainer: "#991B1B", // red-800
      },
      Input: {
        colorBgContainer: "#FEF9C3", // yellow-100
        colorText: "#7F1D1D", // red-900
      },
      Button: {
        colorPrimary: "#EAB308", // yellow-500
        colorPrimaryHover: "#CA8A04", // yellow-600
        colorPrimaryActive: "#A16207", // yellow-700
        colorText: "#7F1D1D", // red-900
      },
    },
  }


    useEffect( () =>
    {
        handleGetConfigSilk()
    }, [])
        

    return (
      

        <div className="container">
  
            <ConfigProvider theme={theme} >
                <div className="flex justify-center items-center" style={{  paddingTop: "120px", paddingBottom: "50px", backgroundColor: "#332511" }}>
                    <Card bordered={true} style={{ width: "50%", backgroundColor: "#7F1D1D", borderColor: "#B91C1C" }}>
                        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                        <Space align="center">
                            <GamepadIcon size={24} color="rgb(251, 191, 36)" />
                            <Title level={3} style={{ margin: 0, color: "rgb(251, 191, 36)"  }}>
                            Đặt hàng
                            </Title>
                        </Space>

                        <Text style={{ color: "#FEF9C3" }}>Nhập tên tài khoản game và chọn mệnh giá nạp tiền</Text>

                        <Form form={form} layout="vertical" initialValues={{ amount: "50000" }} onFinish={handleSubmit}>
                            <Form.Item
                            name="username"
                            label={<Text style={{ color: "#FBBF24" }}>Tên tài khoản game</Text>}
                            rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}
                            >
                            <Input
                                placeholder="Nhập tên tài khoản game của bạn"
                                style={{ backgroundColor: "#FEF9C3", color: "#7F1D1D" }}
                            />
                            </Form.Item>

                            <Form.Item name="amount" label={<Text style={{ color: "#FBBF24" }}>Số tiền</Text>}>
                            <Radio.Group style={{ width: "100%" }}  onChange={( e ) =>
                                        {
                                            console.log("onChange", form.getFieldsValue()) ;
                                    }}
                                    >
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                                {denominations?.map((item) => (
                                    <Radio.Button
                                        key={item.id}
                                        value={item.totalMount}
                                        style={{
                                            height: "auto",
                                            padding: "8px 12px",
                                            backgroundColor: "#991B1B",
                                            borderColor: "#B91C1C",
                                            borderRadius: "0px",
                                            display: "block",
                                            textAlign: "left",
                                            width: "100%",
                                        }}
                                    >
                                    <div style={{ color: "#FBBF24" }}>{FormatVND(item.totalMount)}</div>
                                    <div style={{ fontSize: "12px", color: "#FEF9C3", marginTop: "4px" }}>{item.silkTotal} silk</div>
                                    </Radio.Button>
                                ))}
                                </div>
                            </Radio.Group>
                            </Form.Item>

                            <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{
                                backgroundColor: "#EAB308",
                                color: "#7F1D1D",
                                fontWeight: "bold",
                                height: "40px",
                                fontSize: "16px",
                                }}
                            >
                                Đặt hàng
                            </Button>
                            </Form.Item>
                        </Form>
                        </Space>
                    </Card>
                </div>
    </ConfigProvider>
        </div>

  )
}
