'use client'

import Flex from "@/components/shared-components/Flex";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import useQLHoaDon from "@/hooks/useQLHoaDon";
import { tableOrderDataType } from "@/interface/Order/Order";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Pagination, Table } from "antd";
import { TableProps } from "antd/lib";
import { useEffect } from "react";
import classes from "./page.module.css";
const QLHoaDon = () =>
{
    const { handleGetData, lstOrders,
        pageIndex,
        setPageIndex, setPageSize, loading, pageSize,
        isPannelSearch, dataPage , setIsPannelSearch , searchData, setSearchData} = useQLHoaDon()


    const tableColumns: TableProps<tableOrderDataType>["columns"] = [
        {
            title: "Mã hóa đơn",
            dataIndex: "name",
            key: "name",
            render: (_: any, record: tableOrderDataType) => <span>{record.name}</span>,
      },
        {
            title: "Khách hàng",
            dataIndex: "customer",
            key: "customer",
          render: (_: any,record: tableOrderDataType) => <span>{record?.customer}</span>,
        },
        {
            title: "Ngày tạo",
            dataIndex: "createDateStr",
            key: "createDateStr",
            render: (_: any, record: tableOrderDataType) => <span>{record?.createDateStr}</span>,
        },
        {
            title: "Trạng thái",
            dataIndex: "statusStr",
            key: "statusStr",
          render: (_: any,record: tableOrderDataType) => <span>{record?.statusStr}</span>,
        },
        {
            title: "Tổng tiền",
            dataIndex: "total",
            key: "total",
      render: (_: any,record: tableOrderDataType) => <span>{record.total}</span>,

        }
    ]


    useEffect(() =>
    {
        handleGetData( searchData );
    }, [searchData, handleGetData])

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
                    
                    {/* <Button
                onClick={() => {
                //   handleShowModal();
                }}
                type="primary"
                icon={<PlusCircleOutlined />}
                size="small"
            >
                Thêm mới
            </Button> */}
                </div>


              
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