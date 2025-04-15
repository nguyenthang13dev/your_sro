"use client";
import Flex from "@/components/shared-components/Flex";
import {
  searchBuocXuLyDataType,
  tableBuocXuLyDataType,
} from "@/interface/BuocXuLy/BuocXuLy";
import { DropdownOptionAntd, ResponsePageInfo } from "@/interface/general";
import withAuthorization from "@/libs/authentication";
import { buocXuLyService } from "@/services/BuocXuLy/BuocXuLy.service";
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
import Search from "../search";
import CreateOrUpdate from "../createOrUpdate";
import { toast } from "react-toastify";
import BuocXuLyDetail from "../detail";
import Link from "next/link";
import classes from "../page.module.css";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import QLLuongDoiTuong from "../../QLLuongDoiTuong/page";

const BuocXuLy: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const groupId = id?.toString() ?? null;
  const initSearch: searchBuocXuLyDataType = {
    idLuongXuLy: groupId,
    pageIndex: 1,
    pageSize: 20,
  };
  const router = useRouter();
  const [listBuocXuLy, setListBuocXuLy] = useState<tableBuocXuLyDataType[]>([]);
  const [dataPage, setDataPage] = useState<ResponsePageInfo>();
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
  const [searchValues, setSearchValues] =
    useState<searchBuocXuLyDataType | null>(initSearch);
  const loading = useSelector((state) => state.general.isLoading);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentBuocXuLy, setCurrentBuocXuLy] =
    useState<tableBuocXuLyDataType | null>();
  const [currentDetailBuocXuLy, setCurrentDetailBuocXuLy] =
    useState<tableBuocXuLyDataType>();
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [dropTrangThaiLuongs, setDropTrangThaiLuongs] = useState<
    DropdownOptionAntd[]
  >([]);
  const [dropVaiTros, setDropVaiTros] = useState<DropdownOptionAntd[]>([]);

  const tableColumns: TableProps<tableBuocXuLyDataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      align:'center',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Tên bước xử lý",
      dataIndex: "tenBuocXuLy",
      render: (_: any, record: tableBuocXuLyDataType) => (
        <span>{record.tenBuocXuLy}</span>
      ),
    },
    {
      title: "Mã bước xử lý",
      dataIndex: "maBuocXuLy",
      render: (_: any, record: tableBuocXuLyDataType) => (
        <span>{record.maBuocXuLy}</span>
      ),
    },
    {
      title: "Trạng thái bắt đầu",
      dataIndex: "idTrangThaiBatDau",
      render: (_: any, record: tableBuocXuLyDataType) => (
        <span>{record.trangThaiBatDau_txt}</span>
      ),
    },
    {
      title: "Trạng thái kết thúc",
      dataIndex: "idTrangThaiKetThuc",
      render: (_: any, record: tableBuocXuLyDataType) => (
        <span>{record.trangThaiKetThuc_txt}</span>
      ),
    },
    {
      title: 'Là bước trả về',
      dataIndex: 'isBuocTraVe',
      render: (_: any, record: tableBuocXuLyDataType) => (
        <span>{record.isBuocTraVe ? <CheckCircleOutlined /> : ""}</span>
      ),
    },
    {
      title: "Vai trò tiếp nhận",
      dataIndex: "idLuongXuLy",
      render: (_: any, record: tableBuocXuLyDataType) => (
        <>
          {record.vaiTroTiepNhan_txt &&
            record.vaiTroTiepNhan_txt.map((value, index) => (
              <Tag
                color="cyan"
                key={index}
                className="mb-1"
                style={{ fontSize: "13px", padding: "4px 8px" }}
              >
                {value}
              </Tag>
            ))}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      fixed: "right",
      align:'center',
      render: (_: any, record: tableBuocXuLyDataType) => {
        const items: MenuProps["items"] = [
          {
            label: "Chi tiết",
            key: "1",
            icon: <EyeOutlined />,
            onClick: () => {
              setCurrentDetailBuocXuLy(record);
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
                  handleDeleteBuocXuLy(record.id || "");
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

  const handleDeleteBuocXuLy = async (id: string) => {
    try {
      const response = await buocXuLyService.Delete(id);
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

  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const onFinishSearch: FormProps<searchBuocXuLyDataType>["onFinish"] = async (
    values
  ) => {
    try {
      const searchData: searchBuocXuLyDataType = {
        ...values,
        idLuongXuLy: values.idLuongXuLy || groupId,
        pageIndex: 1,
        pageSize: 20,
      };
      setSearchValues(searchData);
      await handleGetList(searchData);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

  const handleGetList = useCallback(
    async (searchDataOverride?: searchBuocXuLyDataType) => {
      dispatch(setIsLoading(true));
      try {
        const searchData = searchDataOverride || {
          pageIndex,
          pageSize,
          ...(searchValues || {}),
        };
        const response = await buocXuLyService.getDataByPage(searchData);
        if (response != null && response.data != null) {
          const data = response.data;
          const items = data.items;
          setListBuocXuLy(items);
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
    BuocXuLy?: tableBuocXuLyDataType
  ) => {
    setIsOpenModal(true);
    if (isEdit) {
      setCurrentBuocXuLy(BuocXuLy);
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
    setCurrentBuocXuLy(null);
  };

  const handleCloseDetail = () => {
    setIsOpenDetail(false);
  };
  const QuayLai = () => {
    router.push(`/LuongXuLy`);
  };

  const RedirectTrangThaiXuLy = () => {
    router.push(`/TrangThaiLuongXuLy/${groupId}`);
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
          onClick={() => RedirectTrangThaiXuLy()}
          size="small"
          icon={<MenuUnfoldOutlined />}
          color="cyan"
          variant="solid"
          className={classes.mgright5}
        >
          Danh sách trạng thái xử lý
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
            className={`${classes.mgright5} ${classes.colorKetXuat}`}
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
          BuocXuLy={currentBuocXuLy}
          dropTrangThaiLuongs={dropTrangThaiLuongs}
          setDropTrangThaiLuongs={setDropTrangThaiLuongs}
          dropVaiTros={dropVaiTros}
          setDropVaiTros={setDropVaiTros}
          idLuongXuLy={groupId}
        />
      </Flex>
      {isPanelVisible && <Search onFinish={onFinishSearch} />}
      <BuocXuLyDetail
        buocXuLy={currentDetailBuocXuLy}
        isOpen={isOpenDetail}
        onClose={handleCloseDetail}
      />
      <Card style={{ padding: "0px" }} className={classes.customCardShadow}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={listBuocXuLy}
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

      <Card>
        <QLLuongDoiTuong />
      </Card>
    </>
  );
};

export default withAuthorization(BuocXuLy, "BuocXuLy_index");
