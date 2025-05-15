"use client";
import Flex from "@/components/shared-components/Flex";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import DropdownOption, { ResponsePageInfo } from "@/interface/general";
import
  {
    searchGiftCodeItem,
    tableGiftCodeItem
  } from "@/interface/GiftCodeItem/GiftCodeItem";
import { giftCodeItemService } from "@/services/GiftCodeItem/giftCodeItem.service";
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
    SearchOutlined
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
import CreateOrUpdate from "./createOrUpdate";
import QLModuleDetail from "./detail";
import classes from "./page.module.css";
import Search from "./search";

const QLGiftCode: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [listModule, setListModule] = useState<tableGiftCodeItem[]>([]);
  const [dataPage, setDataPage] = useState<ResponsePageInfo>();
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
  const [searchValues, setSearchValues] = useState<searchGiftCodeItem | null>(
    null
  );
  const [dropVaiTros, setDropVaiTros] = useState<DropdownOption[]>([]);
  const loading = useSelector((state) => state.general.isLoading);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [tableGiftCode, setTableGiftCode] =
    useState<tableGiftCodeItem | null>();
  const [currentDetailModule, setCurrentDetailModule] =
    useState<tableGiftCodeItem>();
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [openPopconfirmId, setOpenPopconfirmId] = useState<string | null>(null);

  const tableColumns: TableProps<tableGiftCodeItem>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Mã giftcode",
      dataIndex: "CodeItem",
      render: (_: any, record: tableGiftCodeItem) => (
        <span>{record.codeItem}</span>
      ),
    },
    {
      title: "Tên giftcode",
      dataIndex: "NameItem",

      render: (_: any, record: tableGiftCodeItem) => (
        <span>{record.nameItem}</span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quanlity",
      render: (_: any, record: tableGiftCodeItem) => (
        <span>{record.quanlity}</span>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      fixed: "right",
      render: (_: any, record: tableGiftCodeItem) => {
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
              description="Bạn có muốn xóa vật phẩm này?"
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
      const response = await giftCodeItemService.Delete(id);
      if (response.status) {
        toast.success("Xóa vật phẩm thành công");
        handleGetListModule();
      } else {
        toast.error("Xóa chức năng thất bại");
      }
    } catch (error) {
      toast.error("Xóa chức năng thất bại");
    }
  };

  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const onFinishSearch: FormProps<searchGiftCodeItem>["onFinish"] = async (
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
    async (searchDataOverride?: searchGiftCodeItem) => {
      dispatch(setIsLoading(true));
      try {
        const searchData = searchDataOverride || {
          pageIndex,
          pageSize,
          ...(searchValues || {}),
        };
        const response = await giftCodeItemService.getDataByPage(searchData);

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

  const handleShowModal = (isEdit?: boolean, module?: tableGiftCodeItem) => {
    setIsOpenModal(true);
    if (isEdit) {
      setTableGiftCode(module);
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
    setTableGiftCode(null);
  };

  const handleCloseDetail = () => {
    setIsOpenDetail(false);
  };

  useEffect(() => {
    handleGetListModule();
  }, [handleGetListModule]);

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
            tableGiftCode={tableGiftCode}
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

export default QLGiftCode;
