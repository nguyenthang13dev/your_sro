'use client'
import Flex from "@/components/shared-components/Flex";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import { DeleteOutlined, DownOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, MenuProps, Pagination, Popconfirm, Space, Table, Tag } from "antd";
import { TableProps } from "antd/lib";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import classes from "./page.module.css";

// Thay đổi import type và service
import { ConfigGiftSilkType, searchConfigGiftSilkData } from "@/interface/ConfigGiftSilk/ConfigGiftSilk";
import { configGiftSilkService } from "@/services/ConfigGiftSilk/ConfigGiftSilk.service";
import CreateOrUpdate from "./CreateOrUpdate";

const ConfigGiftSilk = () => {
  // State
  const [lstConfigGiftSilk, setLstConfigGiftSilk] = useState<ConfigGiftSilkType[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [dataPage, setDataPage] = useState<{ totalCount: number }>({ totalCount: 0 });
  const [searchData, setSearchData] = useState<searchConfigGiftSilkData>({});
  const [currentConfigGiftSilk, setCurrentConfigGiftSilk] = useState<ConfigGiftSilkType | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [openPopconfirmId, setOpenPopconfirmId] = useState<string | null>(null);

  // Lấy dữ liệu
  const handleGetData = async (search: searchConfigGiftSilkData) => {
    setLoading(true);
    try {
      const response = await configGiftSilkService.GetData({
        ...search,
        pageIndex,
        pageSize,
      } );
        debugger
      if (response.status) {
        setLstConfigGiftSilk(response.data?.items || []);
        // setDataPage({ totalCount: response.totalCount || 0 });
      } else {
        toast.error("Lấy dữ liệu thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error);
    } finally {
      setLoading(false);
    }
  };

  // Hiện modal
  const handleShowModal = (isEdit?: boolean, module?: ConfigGiftSilkType) => {
    setIsOpenModal(true);
    if (isEdit) {
      setCurrentConfigGiftSilk(module || null);
    } else {
      setCurrentConfigGiftSilk(null);
    }
  };

  // Xóa
  const handleDeleteModule = async (id: string) => {
    try {
      const response = await configGiftSilkService.Delete(id);
      if (response.status) {
        toast.success("Xóa thành công");
        handleGetData(searchData);
      } else {
        toast.error("Xóa thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error);
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
    setCurrentConfigGiftSilk(null);
  };

  const tableColumns: TableProps<ConfigGiftSilkType>["columns"] = [
    {
      title: "Tên bộ quà",
      dataIndex: "nameSet",
      key: "nameSet",
      render: (_: any, record: ConfigGiftSilkType) => <span>{record.nameSet}</span>,
    },
    {
      title: "Giá tiền",
      dataIndex: "amount",
      key: "amount",
      render: (_: any, record: ConfigGiftSilkType) => <span>{record.amount}</span>,
    },
    {
      title: "Danh sách Gift",
      dataIndex: "dsItems",
      key: "dsItems",
        render: ( _: any, record: ConfigGiftSilkType ) =>
        {
            return <span>{record.dsItems?.split( "," )
                .map( (item,idx) =>
                (
                    <Tag color="orange" key={idx}>
                        {item}
                    </Tag>
                )
                )}</span>
        },
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      fixed: "right",
      render: (_: any, record: ConfigGiftSilkType) => {
        const items: MenuProps["items"] = [
          {
            label: "Chỉnh sửa",
            key: "edit",
            icon: <EditOutlined />,
            onClick: () => {
              handleShowModal(true, record);
            },
          },
          {
            label: "Xóa",
            key: "delete",
            danger: true,
            icon: <DeleteOutlined />,
            onClick: () => setOpenPopconfirmId(record.id ?? ""),
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
              description="Bạn có muốn xóa?"
              okText="Xóa"
              cancelText="Hủy"
              open={openPopconfirmId === record.id}
              onConfirm={() => {
                handleDeleteModule(record.id || "");
                setOpenPopconfirmId(null);
              }}
              onCancel={() => setOpenPopconfirmId(null)}
            ></Popconfirm>
          </>
        );
      },
    },
  ];

  const hanleCreateEditSuccess = () => {
    handleGetData(searchData);
  };

  useEffect(() => {
    handleGetData(searchData);
  }, [searchData, pageIndex, pageSize]);

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
        {/* Thay CreateOrUpdate bằng component phù hợp cho ConfigGiftSilk */}
        <CreateOrUpdate
          isOpen={isOpenModal}
          onSuccess={hanleCreateEditSuccess}
          onClose={handleClose}
          ConfigService={currentConfigGiftSilk ?? null}
        />
      </Flex>
      <Card style={{ padding: "0px" }} className={classes.customCardShadow}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={lstConfigGiftSilk}
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
          onShowSizeChange={(current, size) => {
            setPageIndex(current);
            setPageSize(size);
          }}
          size="small"
          align="end"
        />
      </Card>
    </>
  );
};

export default ConfigGiftSilk;