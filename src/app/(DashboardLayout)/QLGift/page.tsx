"use client";
import Flex from "@/components/shared-components/Flex";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import DropdownOption, { ResponsePageInfo } from "@/interface/general";
import
  {
    searchGiftCode,
    tableGiftCode
  } from "@/interface/GiftCode/GiftCode";
import { giftCodeService } from "@/services/GiftCode/giftCode.service";
import { setIsLoading } from "@/store/general/GeneralSlice";
import { useSelector } from "@/store/hooks";
import { AppDispatch } from "@/store/store";
import
  {
    CloseOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    PlusCircleOutlined,
    SearchOutlined,
  } from "@ant-design/icons";
import
  {
    Button,
    Card,
    Dropdown,
    FormProps,
    MenuProps,
    Pagination,
    Popconfirm,
    Space,
    Table,
    TableProps
  } from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import AssignGiftModal from "./AssignGiftModal";
import CreateOrUpdate from "./createOrUpdate";
import QLModuleDetail from "./detail";
import classes from "./page.module.css";
import Search from "./search";

const QLGift: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [listModule, setListModule] = useState<tableGiftCode[]>([]);
  const [dataPage, setDataPage] = useState<ResponsePageInfo>();
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
  const [searchValues, setSearchValues] = useState<searchGiftCode | null>(null);
  const [dropVaiTros, setDropVaiTros] = useState<DropdownOption[]>([]);
  const loading = useSelector((state) => state.general.isLoading);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [currentModule, setCurrentModule] = useState<tableGiftCode | null>();
  const [currentDetailModule, setCurrentDetailModule] =
    useState<tableGiftCode>();
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [openPopconfirmId, setOpenPopconfirmId] = useState<string | null>(null);
const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false);
const [selectedGiftCode, setSelectedGiftCode] = useState<tableGiftCode | null>(null);
  const tableColumns: TableProps<tableGiftCode>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Tên gift",
      dataIndex: "name",
      render: (_: any, record: tableGiftCode) => <span>{record.code}</span>,
    },
    {
      title: "Mã gift",
      dataIndex: "code",
      render: (_: any, record: tableGiftCode) => <span>{record.code}</span>,
    },
     {
      title: "Số lượt sử dụng tối đa",
      dataIndex: "maxCountUsed",
      render: (_: any, record: tableGiftCode) => <span>{record.maxCountUsed}</span>,
    },
     {
      title: "Số lượt đã sử dụng",
      dataIndex: "countUsed",
      render: (_: any, record: tableGiftCode) => <span>{record.countUsed}</span>,
    },
     {
      title: "Thời gian kết thúc",
      dataIndex: "dueDateStr",
      render: (_: any, record: tableGiftCode) =>   <span>{record.dueDateStr}</span>
    },
    {
      title: "Các gift item",
      dataIndex: "giftCodeItems_txt",
      render: (_: any, record: tableGiftCode) => (
        <span>{record.giftCodeItems_txt}</span>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      fixed: "right",
      render: (_: any, record: tableGiftCode) => {
        const items: MenuProps["items"] = [
          {
            label: "Chỉnh sửa",
            key: "3",
            icon: <EditOutlined />,
            onClick: () => {
              handleShowModal(true, record);
            },
          },
          {
            type: "divider",
          },
           {
            label: "Gán giftcode tự động",
          key: "2",
          icon: <PlusCircleOutlined />,
          onClick: () => {
            setSelectedGiftCode(record);
            setIsAssignModalOpen(true);
          },
          },
          {
            label: "Xóa",
            key: "4",
            danger: true,
            icon: <DeleteOutlined />,
            onClick: () => setOpenPopconfirmId(record.id ?? ""),
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
              description="Bạn có muốn xóa gift này?"
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
    handleGetListModule();
  };

  const handleDeleteModule = async (id: string) => {
    try {
      const response = await giftCodeService.Delete(id);
      if (response.status) {
        toast.success("Xóa  gift code thành công");
        handleGetListModule();
      } else {
        toast.error("Xóa gift code thất bại");
      }
    } catch (error) {
      toast.error("Xóa gift code thất bại");
    }
  };

  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const onFinishSearch: FormProps<searchGiftCode>["onFinish"] = async (
    values
  ) => {
    try {
      setSearchValues(values);
      await handleGetListModule(values);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

  const handleGetListModule = useCallback(
    async (searchDataOverride?: searchGiftCode) => {
      dispatch(setIsLoading(true));
      try {
        const searchData = searchDataOverride || {
          pageIndex,
          pageSize,
          ...(searchValues || {}),
        };
        const response = await giftCodeService.getDataByPage(searchData);

        if (response != null && response.data != null) {
          const data = response.data;
          const items = data.items;
          setListModule(items);
          setDataPage({
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            totalCount: data.totalCount,
            totalPage: data.totalPage,
          });
          dispatch(setIsLoading(false));
        }
      } catch (error) {
        dispatch(setIsLoading(false));
      }
    },
    [pageIndex, pageSize]
  );

  const handleShowModal = (isEdit?: boolean, module?: tableGiftCode) => {
    setIsOpenModal(true);
    if (isEdit) {
      setCurrentModule(module);
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
    setCurrentModule(null);
  };

  const handleCloseDetail = () => {
    setIsOpenDetail(false);
  };



  const handleAssign = async (userList: string[]) => {
    if (!selectedGiftCode) return;
    try {
      const res = await giftCodeService.AddGiftCodeForPlayer({
        giftCode: selectedGiftCode.code,
        charNames: userList
      });

      if (res.status) {
        toast.success("Gán giftcode thành công!");
      } else {
        toast.error("Gán giftcode thất bại.");
      }
    } catch (err) {
      toast.error("Lỗi khi gán giftcode.");
    }
  }




  
  useEffect(() => {
    handleGetListModule();
  }, [handleGetListModule]);

  return (
    <>
      
  <AssignGiftModal
  open={isAssignModalOpen}
  onClose={() => setIsAssignModalOpen(false)}
  onAssign={handleAssign}
  giftCodeName={selectedGiftCode?.code || ""}
/>

      <Flex
        alignItems="center"
        justifyContent="space-between"
        className={classes.mgButton10}
      >
        <AutoBreadcrumb />
        <div>
          <Button
            onClick={() => toggleSearch()}
            type="primary"
            size="small"
            icon={isPanelVisible ? <CloseOutlined /> : <SearchOutlined />}
            className={classes.mgright5}
          >
            {isPanelVisible ? "Ẩn tìm kiếm" : "Tìm kiếm"}
          </Button>
          {/* <Link href="/QLModule/Import">
            <Button
              color="pink"
              variant="solid"
              icon={<VerticalAlignTopOutlined />}
              size="small"
              className={`${classes.mgright5} ${classes.colorKetXuat}`}
            >
              Import
            </Button>
          </Link> */}

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
          <CreateOrUpdate
            isOpen={isOpenModal}
            onSuccess={hanleCreateEditSuccess}
            onClose={handleClose}
            tableGiftCode={currentModule}
          />
        </div>
      </Flex>
      {isPanelVisible && <Search onFinish={onFinishSearch} />}
      <QLModuleDetail
        module={currentDetailModule}
        isOpen={isOpenDetail}
        onClose={handleCloseDetail}
      />
      <Card style={{ padding: "0px" }} className={classes.customCardShadow}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={listModule}
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
  );
};

export default QLGift;
