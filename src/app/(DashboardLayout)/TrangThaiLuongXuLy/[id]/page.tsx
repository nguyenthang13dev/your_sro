"use client";
import Flex from "@/components/shared-components/Flex";
import {
  searchTrangThaiLuongXuLyData,
  tableTrangThaiLuongXuLyDataType,
} from "@/interface/TrangThaiLuongXuLy/TrangThaiLuongXuLy";
import { ResponsePageInfo } from "@/interface/general";
import withAuthorization from "@/libs/authentication";
import { trangThaiLuongXuLyService } from "@/services/TrangThaiLuongXuLy/TrangThaiLuongXuLy.service";
import { setIsLoading } from "@/store/general/GeneralSlice";
import { useDispatch, useSelector } from "@/store/hooks";
import {
  CheckCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
  RollbackOutlined,
  SearchOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Dropdown,
  FormProps,
  MenuProps,
  Pagination,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import { useCallback, useEffect, useState } from "react";

import { toast } from "react-toastify";
import classes from "../page.module.css";
import Link from "next/link";
import CreateOrUpdate from "../createOrUpdate";
import Search from "../search";
import TrangThaiLuongXuLyDetail from "../detail";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
const TrangThaiLuongXuLy: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const groupId = id?.toString() ?? null;

  const initSearch: searchTrangThaiLuongXuLyData = {
    idLuongXuLy: groupId,
    pageIndex: 1,
    pageSize: 20,
  };
  const router = useRouter();
  const [listTrangThaiLuongXuLy, setListTrangThaiLuongXuLy] = useState<
    tableTrangThaiLuongXuLyDataType[]
  >([]);
  const [dataPage, setDataPage] = useState<ResponsePageInfo>();
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
  const [searchValues, setSearchValues] =
    useState<searchTrangThaiLuongXuLyData | null>(initSearch);
  const loading = useSelector((state) => state.general.isLoading);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentTrangThaiLuongXuLy, setCurrentTrangThaiLuongXuLy] =
    useState<tableTrangThaiLuongXuLyDataType>();
  const [currentDetailTrangThaiLuongXuLy, setCurrentDetailTrangThaiLuongXuLy] =
    useState<tableTrangThaiLuongXuLyDataType>();
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);

  const tableColumns: TableProps<tableTrangThaiLuongXuLyDataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      align: 'center',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Tên trạng thái",
      dataIndex: "TenTrangThaiXuLy",
      render: (_: any, record: tableTrangThaiLuongXuLyDataType) => (
        <span>{record.tenTrangThaiXuLy}</span>
      ),
    },
    {
      title: "Mã trạng thái",
      dataIndex: "MaTrangThaiXuLy",
      render: (_: any, record: tableTrangThaiLuongXuLyDataType) => (
        <span>{record.maTrangThaiXuLy}</span>
      ),
    },
    {
      title: "Nhóm trạng thái",
      dataIndex: "NhomTrangThai",
      render: (_: any, record: tableTrangThaiLuongXuLyDataType) => (
        <span>{record.idNhomTrangThai}</span>
      ),
    },
    {
      title: "Trạng thái bắt đầu",
      dataIndex: "BatDau",
      align: "center",
      render: (_: any, record: tableTrangThaiLuongXuLyDataType) => (
        <span
          style={{
            fontSize: "25px",
            color: record.isBatDau ? "green" : "",
          }}
        >
          {record.isBatDau ? <CheckCircleOutlined /> : ""}
        </span>
      ),
    },
    {
      title: "Trạng thái kết thúc",
      dataIndex: "KetThuc",
      align: "center",
      render: (_: any, record: tableTrangThaiLuongXuLyDataType) => (
        <span
          style={{
            fontSize: "25px",
            color: record.isKetThuc ? "green" : "",
          }}
        >
          {record.isKetThuc ? <CheckCircleOutlined /> : ""}
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      fixed: "right",
      align: 'center',
      render: (_: any, record: tableTrangThaiLuongXuLyDataType) => {
        const items: MenuProps["items"] = [
          {
            label: "Chi tiết",
            key: "1",
            icon: <EyeOutlined />,
            onClick: () => {
              setCurrentDetailTrangThaiLuongXuLy(record);
              setIsOpenDetail(true);
            },
          },
          {
            label: "Chỉnh sửa",
            key: "2",
            icon: <EditOutlined />,
            onClick: () => {
              handleShowModal(true, record);
            },
          },
          {
            type: "divider",
          },
          {
            label: (
              <Popconfirm
                key={"Delete" + record.id}
                title="Xác nhận xóa"
                description={
                  <span>
                    Bạn có muốn xóa dữ liệu này không? <br /> Sau khi xóa sẽ
                    không thể khôi phục.
                  </span>
                }
                okText="Xóa"
                cancelText="Hủy"
                onConfirm={() => {
                  handleDeleteTrangThaiLuongXuLy(record.id || "");
                }}
                trigger="click"
                forceRender
              >
                <span>Xóa</span>
              </Popconfirm>
            ),
            key: "4",
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

  const hanleCreateEditSuccess = () => {
    handleGetList();
  };

  const handleDeleteTrangThaiLuongXuLy = async (id: string) => {
    try {
      const response = await trangThaiLuongXuLyService.Delete(id);
      if (response.status) {
        toast.success("Xóa tài khoản thành công");
        handleGetList();
      } else {
        toast.error("Xóa tài khoản thất bại");
      }
    } catch (error) {
      toast.error("Xóa tài khoản thất bại");
    }
  };

  const QuayLai = () => {
    router.push(`/LuongXuLy`);
  };

  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const onFinishSearch: FormProps<searchTrangThaiLuongXuLyData>["onFinish"] =
    async (values) => {
      try {
        setSearchValues(values);
        await handleGetList(values);
      } catch (error) {
        console.error("Lỗi khi lưu dữ liệu:", error);
      }
    };

  const handleGetList = useCallback(
    async (searchDataOverride?: searchTrangThaiLuongXuLyData) => {
      dispatch(setIsLoading(true));
      try {
        const searchData = searchDataOverride || {
          pageIndex,
          pageSize,
          ...(searchValues || {}),
        };
        const response = await trangThaiLuongXuLyService.getDataByPage(
          searchData
        );
        if (response != null && response.data != null) {
          const data = response.data;
          const items = data.items;
          setListTrangThaiLuongXuLy(items);
          setDataPage({
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            totalCount: data.totalCount,
            totalPage: data.totalPage,
          });
        }
        dispatch(setIsLoading(false));
      } catch (error) {
        dispatch(setIsLoading(false));
      }
    },
    [pageIndex, pageSize]
  );

  const handleShowModal = (
    isEdit?: boolean,
    TrangThaiLuongXuLy?: tableTrangThaiLuongXuLyDataType
  ) => {
    setIsOpenModal(true);
    if (isEdit) {
      setCurrentTrangThaiLuongXuLy(TrangThaiLuongXuLy);
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleCloseDetail = () => {
    setIsOpenDetail(false);
  };

  const RedirectBuocXuLy = () => {
    router.push(`/BuocXuLy/${groupId}`);
  };

  useEffect(() => {
    handleGetList();
  }, [handleGetList]);

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="end"
        className={classes.mgButton10}
      >
        <Button
          onClick={() => RedirectBuocXuLy()}
          size="small"
          icon={<MenuUnfoldOutlined />}
          color="cyan"
          variant="solid"
          className={classes.mgright5}
        >
          Danh sách bước xử lý
        </Button>
        <Button
          onClick={() => QuayLai()}
          size="small"
          icon={<RollbackOutlined />}
          color="danger"
          variant="solid"
          className={classes.mgright5}
        >
          Quay lại
        </Button>
        <Button
          onClick={() => toggleSearch()}
          type="primary"
          size="small"
          icon={isPanelVisible ? <CloseOutlined /> : <SearchOutlined />}
          className={classes.mgright5}
        >
          {isPanelVisible ? "Ẩn tìm kiếm" : "Tìm kiếm"}
        </Button>
        <Link href="/QLNguoiDung/Import">
          <Button
            color="pink"
            variant="solid"
            icon={<VerticalAlignTopOutlined />}
            size="small"
            className={classes.mgright5}
          >
            Import
          </Button>
        </Link>
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
          TrangThaiLuongXuLy={currentTrangThaiLuongXuLy}
          luongXuLyId={id as string}
        />
      </Flex>
      {isPanelVisible && <Search onFinish={onFinishSearch} />}
      <TrangThaiLuongXuLyDetail
        trangThaiLuongXuLy={currentDetailTrangThaiLuongXuLy}
        isOpen={isOpenDetail}
        onClose={handleCloseDetail}
      />
      <Card style={{ padding: "0px" }} className={classes.customCardShadow}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={listTrangThaiLuongXuLy}
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
            range[0] + "-" + range[1] + " trong " + total + " dữ liệu"
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

export default withAuthorization(
  TrangThaiLuongXuLy,
  "TrangThaiLuongXuLy_index"
);
