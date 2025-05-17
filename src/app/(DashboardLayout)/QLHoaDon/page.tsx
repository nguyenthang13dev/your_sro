'use client'

import Flex from "@/components/shared-components/Flex";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import useQLHoaDon from "@/hooks/useQLHoaDon";
import { tableOrderDataType } from "@/interface/Order/Order";
import { CloseOutlined, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Pagination, Table } from "antd";
import { TableProps } from "antd/lib";
import { useEffect } from "react";
import classes from "./page.module.css";
const QLHoaDon = () =>
{
    const { handleGetData, lstOrders,
        pageIndex,
        setPageIndex, setPageSize, loading, pageSize,
        isPannelSearch, dataPage , setIsPannelSearch } = useQLHoaDon()


    const tableColumns: TableProps<tableOrderDataType>["columns"] = [
        {
            title: "Mã hóa đơn",
            dataIndex: "id",
            key: "id",
            render: (recrod: tableOrderDataType) => <span>{recrod.name}</span>,
        },
        {
            title: "Tên khách hàng",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdDate",
            key: "createdDate",
            render: (recrod: tableOrderDataType) => <span>{recrod.name}</span>,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
        }
    ]


    useEffect(() =>
    {
        // handleGetData( searchData );
    }, [pageIndex, pageSize, handleGetData])

    return (
        <>
            <Flex
                alignItems="center"
                justifyContent="space-between"
                className={classes.mgButton10}
            >
                <AutoBreadcrumb />
                <div>   
                    <Button
                        type="primary"
                        className={classes.mgButton10}
                        onClick={() => setIsPannelSearch(!isPannelSearch)}
                        icon={isPannelSearch ? <CloseOutlined /> : <SearchOutlined />}
                    >
                        {isPannelSearch ? "Ẩn tìm kiếm" : "Tìm kiếm"}
                    </Button>
                </div>


                <Button
                onClick={() => {
                //   handleShowModal();
                }}
                type="primary"
                icon={<PlusCircleOutlined />}
                size="small"
            >
                Thêm mới
            </Button>
            </Flex>
          <Card style={{ padding: "0px" }} className={classes.customCardShadow}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={lstOrders}
            rowKey="id"
            scroll={{ x: "max-content" }}
            pagination={false}
            loading={loading}
          />
        </div>
        <Pagination
          className="mt-2"
          total={dataPage?.totalCount}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} trong ${total} dữ liệu`
          }
          pageSize={pageSize}
          defaultCurrent={1}
          onChange={(e) => {
            setPageIndex(e);
          }}
          onShowSizeChange={(current, pageSize) => {
            setPageIndex(current);
            setPageSize(pageSize);
          }}
          size="small"
          align="end"
        />
      </Card>
        
        </>

    )

                
                
                
                


}


export default QLHoaDon;