"use client";
import { DropdownOption, ResponsePageInfo } from "@/interface/general";
import { AppDispatch } from "@/store/store";
import {
  CheckCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Dropdown,
  MenuProps,
  Pagination,
  Popconfirm,
  Space,
  Table,
  TableColumnsType,
  Typography,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import classes from "./page.module.css";
import Flex from "@/components/shared-components/Flex";
import { useSelector } from "@/store/hooks";
import { setIsLoading } from "@/store/general/GeneralSlice";
import CreateUpdateForm from "./CreateUpdateForm";
import withAuthorization from "@/libs/authentication";
import {
  qlPages_BannerType,
  searchDataType,
} from "@/interface/QLPages_Banner/QLPages_Banner";

import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import { qlPages_BannerService } from "@/services/QLPages_Banner/QLPages_Banner.service";
import DrawerSlice from "./DrawerUpload";
import BannerConstant from "@/constants/BannerConstant";
import { qLPage_ComponentService } from "@/services/QLPage_Component/QLPage_Component.service";
import { BANNERS } from "@/constants/TypeCompoentConstant";

const QLPages_Banner: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [dsBanner, setDsBanner] = useState<qlPages_BannerType[]>();
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<qlPages_BannerType>();

  const [dataPageResponse, setDataPageResponse] = useState<ResponsePageInfo>();
  const [pageSizeInfo, setPageSizeInfo] = useState("loading...");

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);

  const loading = useSelector((state) => state.general.isLoading);
  //chuyên mục current
  const [qlbannerCurrent, setQlbannerCurrent] = useState<qlPages_BannerType>();

  const [dropDownCode, setCodeDropDown] = useState<DropdownOption[]>([]);
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleOpenDrawSlice = (item: qlPages_BannerType) => {
    setIsOpenDrawer(true);
    setCurrentItem(item);
  };

  const handleCloseDrawSlice = () => {
    setIsOpenDrawer(false);
  };

  const handleDropDown = useCallback(async () => {
    try {
      const response = await qLPage_ComponentService.GetDropdownCode(BANNERS);
      setCodeDropDown(response.data);
    } catch (err) {
      toast.error("Lấy danh sách code không thành công");
    }
  }, []);

  const handleShowModal = (record?: qlPages_BannerType) => {
    setQlbannerCurrent(record);
    setIsOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      if (id == null) {
        toast.error("Yêu cầu chọn đối tượng để xóa");
        return;
      }
      const res = await qlPages_BannerService.Delete(id);
      if (res.status) {
        toast.success("Xóa thành công chuyên mục");
        handleGetData();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Có lỗi trong quá trình xử lý: " + err);
    }
  };

  const tableColumns: TableColumnsType<qlPages_BannerType> = [
    {
      key: "index",
      title: "STT",
      dataIndex: "index",
      align: "center",
      width: "1%",
      render: (_: any, __: qlPages_BannerType, index: number) =>
        pageSize * (pageIndex - 1) + index + 1,
    },
    {
      key: "typeBanner",
      title: "Loại banner",
      dataIndex: "typeBanner",
      align: "center",
      render: (_, record) => {
        return BannerConstant.getDisplayName(record.typeBanner || "");
      },
    },
    {
      key: "code_txt",
      title: "Code",
      dataIndex: "code_txt",
      align: "center",
    },
    {
      key: "slidesPerView",
      title: "Số lượng view/slice",
      dataIndex: "slidesPerView",
      align: "center",
    },
    {
      key: "totalSlides",
      title: "Tổng số slice",
      dataIndex: "totalSlides",
      align: "center",
    },
    {
      key: "autoplayDelay",
      title: "Thời gian chờ",
      dataIndex: "autoplayDelay",
      align: "center",
    },
    {
      key: "effect",
      title: "Hiệu ứng",
      dataIndex: "effect",
      align: "center",
    },
    {
      key: "loop",
      title: "Có lặp?",
      dataIndex: "loop",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <span
              style={{
                fontSize: "18px",
                color: record.loop ? "green" : "red",
              }}
            >
              {record.loop ? <CheckCircleOutlined /> : ""}
            </span>
          </>
        );
      },
    },
    {
      key: "navigation",
      title: "Có chuyển hướng",
      dataIndex: "navigation",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <span
              style={{
                fontSize: "18px",
                color: record.navigation ? "green" : "red",
              }}
            >
              {record.navigation ? <CheckCircleOutlined /> : ""}
            </span>
          </>
        );
      },
    },
    {
      key: "pagination",
      title: "Có phân trang",
      dataIndex: "pagination",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <span
              style={{
                fontSize: "18px",
                color: record.pagination ? "green" : "red",
              }}
            >
              {record.pagination ? <CheckCircleOutlined /> : ""}
            </span>
          </>
        );
      },
    },

    {
      key: "actions",
      title: "Thao tác",
      dataIndex: "actions",
      align: "center",
      width: "5%",
      fixed: "right",
      render: (_: any, record: qlPages_BannerType) => {
        const items: MenuProps["items"] = [
          {
            label: "Chi tiết",
            key: "1",
            icon: <EyeOutlined />,
            onClick: () => {
              setQlbannerCurrent(record);
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
            label: "Thiết lập slice",
            key: "3",
            icon: <EditOutlined />,
            onClick: () => {
              setQlbannerCurrent(record);
              handleOpenDrawSlice(record);
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
                onConfirm={() => handleDelete(record.id)}
                trigger="click"
                forceRender
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <DeleteOutlined />
                  <span>Xóa</span>
                </div>
              </Popconfirm>
            ),
            key: "4",
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
    async (searchData?: searchDataType) => {
      dispatch(setIsLoading(true));
      try {
        const params =
          searchData ||
          ({
            pageSize: Number(pageSize) || 1,
            pageIndex: Number(pageIndex) || 1,
          } as searchDataType);
        const response = await qlPages_BannerService.GetData(params);
        if (response != null && response.data != null) {
          const data = response.data;
          setDsBanner(data.items);
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
    handleDropDown();
  }, [handleGetData]);

  return (
    <>
      <AutoBreadcrumb />
      <Flex
        alignItems="center"
        justifyContent="end"
        className={classes.mgButton10}
      >
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
      </Flex>

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
          dataSource={dsBanner}
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
        data={qlbannerCurrent}
        dropdownCodeWidget={dropDownCode}
      />

      {/* <DrawerChiTiet
      {/* <DrawerChiTiet
                isOpen={openDrawer}
                onClose={() => {
                    handleCloseDrawer();
                }}
                data={qlbannerCurrent}
            /> */}

      {/* Draw slice */}
      {/* Draw slice */}

      <DrawerSlice
        isOpen={isOpenDrawer}
        handleClose={handleCloseDrawSlice}
        handleSuccess={handleCreateEditSuccess}
        item={currentItem!}
        totalFile={qlbannerCurrent?.totalSlides || 1}
      />
    </>
  );
};

export default withAuthorization(QLPages_Banner, "QLPAGES_Banner");
