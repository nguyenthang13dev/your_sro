"use client";

import { DropdownOption, ResponsePageInfo } from "@/interface/general";
import {
  searchQLPagesDataType,
  tableQLPagesDataType,
} from "@/interface/QLPage/qLPage";
import { useSelector } from "@/store/hooks";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppDispatch } from "@/store/store";
import { qlPagesService } from "@/services/QLPages/QLPages.service";
import {
  Button,
  Card,
  Dropdown,
  Pagination,
  Popconfirm,
  Space,
  Table,
  TableColumnsType,
  Typography,
} from "antd";
import { MenuProps } from "antd/lib";
import {
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import classes from "./page.module.css";
import Flex from "@/components/shared-components/Flex";
import withAuthorization from "@/libs/authentication";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/store/general/GeneralSlice";
import CreateUpdateForm from "./CreateUpdateForm";
import { useRouter } from "next/navigation";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";

const QLPages: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [dsChuyenMuc, setDsChuyenMuc] = useState<tableQLPagesDataType[]>();
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [dataPageResponse, setDataPageResponse] = useState<ResponsePageInfo>();

  const [pageSizeInfo, setPageSizeInfo] = useState("loading...");

  const [dropdownChuyenMuc, setDropDownChuyenMuc] = useState<DropdownOption[]>(
    []
  );

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);

  const loading = useSelector((state) => state.general.isLoading);
  //chuyên mục current
  const [currentPage, setCurrentPage] = useState<tableQLPagesDataType>();

  const [searchValue, setSearchValues] = useState<searchQLPagesDataType | null>(
    null
  );

  const router = useRouter();

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleShowModal = (record?: tableQLPagesDataType) => {
    setCurrentPage(record);
    setIsOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      if (id == null) {
        toast.error("Yêu cầu chọn đối tượng để xóa");
        return;
      }
      const res = await qlPagesService.Delete(id);
      if (res.status) {
        toast.success("Xóa thành công chuyên mục");
        handleGetData();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Có lỗi trong quá trình xử lý");
    }
  };

  const handleSearch = async (values: searchQLPagesDataType) => {
    try {
      setSearchValues(values);
      await handleGetData(values);
    } catch (err) {
      toast.error("Có lỗi xảy ra trong quá trình xử lý");
    }
  };

  const tableColumns: TableColumnsType<tableQLPagesDataType> = [
    {
      key: "index",
      title: "STT",
      dataIndex: "index",
      align: "center",
      width: "1%",
      render: (_: any, __: tableQLPagesDataType, index: number) =>
        pageSize * (pageIndex - 1) + index + 1,
    },
    {
      key: "titlePage",
      title: "Tên page",
      dataIndex: "titlePage",
    },
    {
      key: "metaDescription",
      title: "Mô tả",
      dataIndex: "metaDescription",
    },
    {
      key: "slug",
      title: "Đường dẫn page",
      dataIndex: "slug",
    },
    {
      key: "metaTitle",
      title: "Tiêu đề thẻ",
      dataIndex: "metaTitle",
      align: "center",
    },
    {
      key: "metaKeyword",
      title: "Từ khóa",
      dataIndex: "metaKeyword",
      align: "center",
    },
    {
      key: "actions",
      title: "Thao tác",
      dataIndex: "actions",
      align: "center",
      width: "5%",
      fixed: "right",
      render: (_: any, record: tableQLPagesDataType) => {
        const items: MenuProps["items"] = [
          {
            label: "Chi tiết",
            key: "1",
            icon: <EyeOutlined />,
            onClick: () => {
              setCurrentPage(record);
              handleOpenDrawer();
            },
          },
          {
            label: "Chỉnh sửa",
            key: "2",
            icon: <EditOutlined />,
            onClick: () => {
              handleShowModal(record);
            },
          },
          {
            label: "Cấu hình page",
            key: "4",
            icon: <EditOutlined />,
            onClick: () => {
              const parrams = new URLSearchParams({
                idPage: record.id || "",
                // title: record.titlePage || "",
                // slug: record.titlePage || "",
              });
              router.push(`/QLPages_Content?idPage=${record?.id}`);
            },
          },
          {
            label: (
              <Popconfirm
                key={`Delete${record.id}`}
                title="Xác nhận xóa"
                description={
                  <span>
                    Bạn có muốn xóa không? <br /> Sau khi xóa sẽ không thể khôi
                    phục.
                  </span>
                }
                okText="Xóa"
                cancelText="Hủy"
                onConfirm={() => {
                  handleDelete(record.id);
                }}
                trigger="click"
                forceRender
              >
                <span>Xóa</span>
              </Popconfirm>
            ),
            key: "5",
            icon: <DeleteOutlined />,
            danger: true,
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
          </>
        );
      },
    },
  ];

  const handleCreateEditSuccess = () => {
    handleGetData();
  };

  const handleGetData = useCallback(
    async (searchData?: searchQLPagesDataType) => {
      dispatch(setIsLoading(true));
      try {
        const params =
          searchData ||
          ({
            pageSize: Number(pageSize) || 1,
            pageIndex: Number(pageIndex) || 1,
          } as searchQLPagesDataType);

        const response = await qlPagesService.getDataByPage(params);
        if (response != null && response.data != null) {
          const data = response.data;
          setDsChuyenMuc(data.items);
          setDataPageResponse({
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            totalCount: data.totalCount,
            totalPage: data.totalPage,
          });
          setPageSizeInfo("");
          dispatch(setIsLoading(false));
        }
      } catch (err) {
        toast.error("Không tìm thấy kết quả");
        dispatch(setIsLoading(false));
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [pageIndex, pageSize]
  );
  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  useEffect(() => {
    handleGetData();
  }, []);

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
      </Flex>

      {/* //{isPanelVisible && <Search handleSearch={handleSearch} />} */}

      <Card style={{ padding: "0px" }} className={classes.customCardShadow}>
        <Flex alignItems="center" justifyContent="end" margin="10px">
          <Typography.Text strong>{pageSizeInfo}</Typography.Text>
        </Flex>

        <Table
          columns={tableColumns}
          pagination={false}
          bordered
          rowKey="id"
          scroll={{
            x: "max-content",
          }}
          dataSource={dsChuyenMuc}
          loading={loading}
          tableLayout="fixed"
        />
        <Pagination
          className="mt-2"
          total={dataPageResponse?.totalCount}
          showTotal={(total, range) => {
            const pageSizeInfo = `${range[0]}-${range[1]} trong ${total} chuyên mục`;
            setPageSizeInfo(pageSizeInfo);
            return pageSizeInfo;
          }}
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

      <CreateUpdateForm
        isOpen={isOpenModal}
        onSuccess={handleCreateEditSuccess}
        onClose={handleClose}
        data={currentPage}
      />

      {/* <DrawerChiTiet
                isOpen={openDrawer}
                onClose={() => {
                    handleCloseDrawer();
                }}
                data={chuyenMucCurrent}
            /> */}
    </>
  );
};

export default withAuthorization(QLPages, "QLPAGES");
