"use client"

import { createOrEdit } from "@/interface/OrderVp/OrderVp"
import { searchWebShopSearchVM, tableWebShopDataType } from "@/interface/WebShop/WebShop"
import { orderVpService } from "@/services/OrderVp/OrderVp.service"
import { qlWebShopeService } from "@/services/WebShop/WebShop.service"
import { setIsLoading } from "@/store/general/GeneralSlice"
import { useSelector } from "@/store/hooks"
import { AppDispatch } from "@/store/store"
import
  {
    CrownOutlined,
    GiftOutlined,
    InfoCircleOutlined,
    ShoppingCartOutlined
  } from "@ant-design/icons"
import { Badge, Button, Card, Col, Input, Popover, Rate, Row, Space, Spin, Tag, Tooltip, Typography } from "antd"
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import OrderCustomer from "./OrderVpCustomer"

const { Title, Text, Paragraph } = Typography

interface CreateOrderVp
{
  setId: string,
  amount: number,
  username: string,
}


function ItemSetsShop()
{
  const dispatch = useDispatch<AppDispatch>();
  const [loadingSet, setLoadingSet] = useState<string | null>(null)
  const [ itemSets, setDsItems ] = useState<tableWebShopDataType[]>([]);
  
  const [ orDerVp, setOrderVp ] = useState<createOrEdit>();
  const [ selectedSet, setSelectedSet ] = useState<tableWebShopDataType | null>( null );
  const [ showQR, setShowQR ] = useState( false );
  const [ charname, setCharName ] = useState( "");
  const userInfor = useSelector( state => state.auth.User );

 const handleAddOrder = async ( values: createOrEdit ) =>
    {
        try {
            const response = await orderVpService.Create(values);
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
    const handleBuyNow = async (values: CreateOrderVp) => {
      const selected = itemSets.find((set) => set.id === values.setId);
      
       // Tạo 1 order theo giá trị 
      const orderVP: createOrEdit = {
        name: values.username,
        idWebShop: values.setId,
        total: values.amount,
        paymentStatus: "Unpaid",
        id: ""
      }

              
      const res = await handleAddOrder(orderVP)
      if ( res )
      {
        orderVP.id = res?.id;
        setOrderVp(orderVP); 
        if (selected) {
          setSelectedSet( selected );
        }
      }

    };
    
      const handleGetListModule = useCallback(
         async (searchDataOverride?: searchWebShopSearchVM) => {
           dispatch(setIsLoading(true));
           try {
             const searchData = searchDataOverride || {
               pageIndex: 1,
               pageSize: -1
             };
             const response = await qlWebShopeService.getDataByPage(searchData);
             if (response != null && response.data != null) {
               const data = response.data;
               const items = data.items;
               setDsItems(items);
               dispatch(setIsLoading(false));
             }
           } catch (error) {
             dispatch(setIsLoading(false));
           }
         },
         []
       );


 

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const renderDetailContent = (set: tableWebShopDataType) => (
    <div className="w-80 p-2">
      <div className="mb-4">
        <Title level={5} className="!mb-2">
          {set.nameSet}
        </Title>
      </div>

      <div className="mb-4">
        <Space direction="vertical" size="small" className="w-full">
          <div className="flex justify-between">
            <Text strong>Đánh giá:</Text>
            <Space>
              <Rate disabled defaultValue={5} allowHalf  />
              <Text className="text-sm">{5}/5</Text>
            </Space>
          </div>
          <div className="flex justify-between">
            <Text strong>Số lượng vật phẩm:</Text>
            <Text>{set?.giftCodeItems_txt?.split(",").length} items</Text>
          </div>
        </Space>
      </div>

      <div className="mb-4">
        <Text strong className="block mb-2">
          Chi tiết vật phẩm:
        </Text>
        <div className="space-y-2">
          {set?.giftCodeItems_txt?.split(",").map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <CrownOutlined className="text-yellow-500" />
              <Text className="text-sm">{item}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  useEffect(() => {
    if (selectedSet && orDerVp) {
      setShowQR(true);
    }
  }, [selectedSet, orDerVp]);

    
    useEffect( () =>
    {
        handleGetListModule()
    }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Title level={1} className="!text-4xl !font-bold !text-gray-900 !mb-4">
            Cửa Hàng Vật Phẩm 
          </Title>
          <Paragraph className="!text-lg !text-gray-600 max-w-2xl mx-auto">
            Khám phá các bộ sưu tập vật phẩm độc đáo với sức mạnh phi thường. Nâng cấp nhân vật của bạn ngay hôm nay!
          </Paragraph>
        </div>

        <Col md={6} className="my-4">
          
          <label htmlFor="">Tên nhân vật 

            <Tag color="red">*</Tag>
          </label>
          <Input placeholder="Nhập tên nhân vật" name="charName"
            onChange={( e ) =>
            {
              setCharName(e.target.value)
            }}
          />
        </Col>

        {/* Items Grid */}
        <Row gutter={[24, 24]}>
          {itemSets.map((set) => (
            <Col xs={24} md={12} lg={8} key={set.id}>
              <Badge.Ribbon
                color="red"
              >
                <Popover
                  content={renderDetailContent(set)}
                  title={
                    <div className="flex items-center gap-2">
                      <InfoCircleOutlined className="text-blue-500" />
                      <Text strong>Thông tin chi tiết</Text>
                    </div>
                  }
                  trigger="hover"
                  placement="right"
                  overlayClassName="custom-popover"
                  mouseEnterDelay={0.3}
                  mouseLeaveDelay={0.1}
                >
                  <Card
                    hoverable
                    className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
                    cover={
                      <div className="relative overflow-hidden">
                        <Tooltip title="Di chuột để xem chi tiết" placement="top">
                          <div className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                            <InfoCircleOutlined className="text-blue-500" />
                          </div>
                        </Tooltip>
                      </div>
                    }
                    actions={[
                      <Button
                        key="buy"
                        type="primary"
                        size="large"
                        icon={loadingSet === set.id ? <Spin size="small" /> : <ShoppingCartOutlined />}
                        onClick={() =>
                        {
                          if ( charname === "" )
                          {
                            toast.error( "Yêu cầu nhập tên nhân vật!" );
                            return;
                          }
                          handleBuyNow( {
                            setId: set.id ?? "",
                            amount: set.giaTien,
                            username: charname ?? ""
                          } )
                        }
                        }
                        loading={loadingSet === set.id}
                        className=" bg-gradient-to-r from-purple-600 to-blue-600 border-none hover:from-purple-700 hover:to-blue-700"
                      >
                        {loadingSet === set.id ? "Đang xử lý..." : "Mua Ngay"}
                      </Button>,
                    ]}
                  >
                    <div className="p-2">
                      <div className="flex items-center justify-between mb-2">
                        <Title level={4} className="!mb-0 !text-gray-900">
                          {set.nameSet}
                        </Title>
                        <Tooltip title="Xem thông tin chi tiết">
                          <InfoCircleOutlined className="text-gray-400 hover:text-blue-500 cursor-pointer" />
                        </Tooltip>
                      </div>


                      {/* Rating */}
                      <Space className="mb-4">
                        <Rate disabled defaultValue={5} allowHalf className="!text-sm" />
                        <Text className="text-sm font-medium">{5}</Text>
                      </Space>

                      {/* Items List - Simplified */}
                      <div className="mb-4">
                        <Space className="mb-2">
                          <GiftOutlined className="text-gray-500" />
                          <Text className="text-sm font-medium text-gray-700">Bao gồm {set?.giftCodeItems_txt?.split(",").length} vật phẩm</Text>
                          <Tooltip title="Di chuột vào card để xem chi tiết các vật phẩm">
                            <InfoCircleOutlined className="text-gray-400 text-xs" />
                          </Tooltip>
                        </Space>
                        <div className="flex flex-wrap gap-1">
                          {set?.giftCodeItems_txt?.split(",").slice(0, 2).map((item, index) => (
                            <Tag key={index} className="text-xs">
                              {item}
                            </Tag>
                          ))}
                          {set?.giftCodeItems_txt?.split(",").length > 2 && <Tag className="text-xs">+{set?.giftCodeItems_txt?.split(",").length - 2} khác</Tag>}
                        </div>
                      </div>

                      {/* Price */}
                      <Space className="mb-4">
                        <Text className="text-2xl font-bold text-purple-600">{formatPrice(set.giaTien)}</Text>
                       
                      </Space>
                    </div>
                  </Card>
                </Popover>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>

      
          </div>
          
      {
        (orDerVp && showQR) && 
         <OrderCustomer open={showQR} tableSet={selectedSet} onClose={() =>
        {
           setShowQR(false);
    setOrderVp(undefined);
    setSelectedSet(null);
          }} record={orDerVp} />
     }
     
    </div>
  )
}


export default ItemSetsShop
