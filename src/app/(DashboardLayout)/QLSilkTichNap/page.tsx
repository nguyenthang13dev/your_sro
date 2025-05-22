'use client'
import Flex from "@/components/shared-components/Flex";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import useQLSikTichNap from "@/hooks/useQLSikTichNap";
import { tableSilkTichNapDataType } from "@/interface/QLSilkTichNap/QLSilkTichNap";
import { DeleteOutlined, DownOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, MenuProps, Pagination, Popconfirm, Space, Table } from "antd";
import { TableProps } from "antd/lib";
import { useEffect, useState } from "react";
import CreateOrUpdate from "./createOrUpdate";
import classes from "./page.module.css";



const QLHoaDon = () =>
{
  const { handleGetData,
    lstSilkTichNap,
     pageIndex,
    setPageIndex,
    setPageSize,
    loading,
    pageSize,
    isPannelSearch,
    dataPage, setIsPannelSearch, searchData, setSearchData,
    setLstSilkTichNap, setSilTichNapSelected,
    currentTichNap,
    setCurrentTichNap,
  } = useQLSikTichNap()




  const handleShowModal = (  ) =>
  {
    setIsOpenModal( true );
  }
  
  const handleClose = () => {
    setIsOpenModal(false);
    setCurrentTichNap(null);
  };


    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    
  
    const tableColumns: TableProps<tableSilkTichNapDataType>["columns"] = [
        {
            title: "Mốc nạp",
            dataIndex: "rank",
            key: "rank",
            render: (_: any, record: tableSilkTichNapDataType) => <span>{record.rank}</span>,
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
          render: (_: any,record: tableSilkTichNapDataType) => <span>{record?.description}</span>,
      },
         {
            title: "Danh sách vật phẩm đi kèm",
            dataIndex: "dsItem",
            key: "dsItem",
          render: (_: any,record: tableSilkTichNapDataType) => <span>{record?.dsItemsName}</span>,
        },
       
        {
            title: "Thao tác",
          dataIndex: "actions",
            fixed: "right",
           render: (_: any, record: tableSilkTichNapDataType) => {
                  const items: MenuProps["items"] = [
                    {
                      label: "Chỉnh sửa",
                      key: "4",
                      icon: <EditOutlined />,
                      onClick: () => {
                        // handleShowModal(true, record);
                      },
                    },
                    {
                      label: "Xóa",
                      key: "5",
                      danger: true,
                      icon: <DeleteOutlined />,
                      // onClick: () => setOpenPopconfirmId(record.id ?? ""),
                    },
                    {
                      type: "divider",
                    },
                  ];
                  return (
                    <>
                      <Dropdown menu={{ items }} trigger={["click"]}>
                        <Button
                          onClick={(e) => e.preventDefault()}
                          color="primary"
                          size="small"
                        >
                          <Space>
                            Thao tác
                            <DownOutlined />
                          </Space>
                        </Button>
                      </Dropdown>
                      <Popconfirm
                        title="Xác nhận xóa"
                        description="Bạn có muốn xóa cấu hình silk này?"
                        okText="Xóa"
                        cancelText="Hủy"
                        // open={openPopconfirmId === record.id}
                        onConfirm={() => {
                          // handleDeleteModule(record.id || "");
                          // setOpenPopconfirmId(null);
                        }}
                        // onCancel={() => setOpenPopconfirmId(null)}
                      ></Popconfirm>
                    </>
                  );
                },
        }
    ]


  const hanleCreateEditSuccess = () => {
    handleGetData(searchData);
  };

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
                onClick={() => {
                   handleShowModal();
                }}
                type="primary"
                icon={<PlusCircleOutlined />}
                size="small"
            >
                Thêm mới
            </Button>
                </div>

          
          <CreateOrUpdate
              isOpen={isOpenModal}
              onSuccess={hanleCreateEditSuccess}
              onClose={handleClose}
              silktichnap={currentTichNap}
          />


              
            </Flex>
          <Card style={{ padding: "0px" }} className={classes.customCardShadow}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={lstSilkTichNap}
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