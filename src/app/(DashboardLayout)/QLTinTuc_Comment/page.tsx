"use client";
import Flex from "@/components/shared-components/Flex";
import {
  searchQLTinTuc_CommentDataType,
  tableQLTinTuc_CommentDataType,
} from "@/interface/QLTinTuc_Comment/QLTinTuc_Comment";
import { ResponsePageInfo } from "@/interface/general";
import withAuthorization from "@/libs/authentication";
import { qLTinTuc_CommentService } from "@/services/QLTinTuc_Comment/QLTinTuc_Comment.service";
import { setIsLoading } from "@/store/general/GeneralSlice";
import { useDispatch, useSelector } from "@/store/hooks";
import {
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
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
} from "antd";
import { useCallback, useEffect, useState } from "react";
import Search from "./search";
import CreateOrUpdate from "./createOrUpdate";
import { toast } from "react-toastify";
import QLTinTuc_CommentDetail from "./detail";
import Link from "next/link";
import classes from "./page.module.css";

const QLTinTuc_Comment: React.FC = () => {
  const dispatch = useDispatch();
  const [listQLTinTuc_Comment, setListQLTinTuc_Comment] = useState<
    tableQLTinTuc_CommentDataType[]
  >([]);
  const [dataPage, setDataPage] = useState<ResponsePageInfo>();
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
  const [searchValues, setSearchValues] =
    useState<searchQLTinTuc_CommentDataType | null>(null);
  const loading = useSelector((state) => state.general.isLoading);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentQLTinTuc_Comment, setCurrentQLTinTuc_Comment] =
    useState<tableQLTinTuc_CommentDataType>();
  const [currentDetailQLTinTuc_Comment, setCurrentDetailQLTinTuc_Comment] =
    useState<tableQLTinTuc_CommentDataType>();
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);

  const tableColumns: TableProps<tableQLTinTuc_CommentDataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "id",
      dataIndex: "id",
      render: (_: any, record: tableQLTinTuc_CommentDataType) => (
        <span>{record.id}</span>
      ),
    },
    {
      title: "id_TinTuc",
      dataIndex: "id_TinTuc",
      render: (_: any, record: tableQLTinTuc_CommentDataType) => (
        <span>{record.id_TinTuc}</span>
      ),
    },
    {
      title: "comment",
      dataIndex: "comment",
      render: (_: any, record: tableQLTinTuc_CommentDataType) => (
        <span>{record.comment}</span>
      ),
    },
    {
      title: "isHidden",
      dataIndex: "isHidden",
      render: (_: any, record: tableQLTinTuc_CommentDataType) => (
        <span>{record.isHidden}</span>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      fixed: "right",
      render: (_: any, record: tableQLTinTuc_CommentDataType) => {
        const items: MenuProps["items"] = [
          {
            label: "Chi tiết",
            key: "1",
            icon: <EyeOutlined />,
            onClick: () => {
              setCurrentDetailQLTinTuc_Comment(record);
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
                  handleDeleteQLTinTuc_Comment(record.id || "");
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

  const handleDeleteQLTinTuc_Comment = async (id: string) => {
    try {
      const response = await qLTinTuc_CommentService.Delete(id);
      if (response.status) {
        toast.success("Xóa bình luận thành công");
        handleGetList();
      } else {
        toast.error("Xóa bình luận thất bại");
      }
    } catch (error) {
      toast.error("Xóa bình luận thất bại");
    }
  };

  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const onFinishSearch: FormProps<searchQLTinTuc_CommentDataType>["onFinish"] =
    async (values) => {
      try {
        setSearchValues(values);
        await handleGetList(values);
      } catch (error) {
        console.error("Lỗi khi lưu dữ liệu:", error);
      }
    };

  const handleGetList = useCallback(
    async (searchDataOverride?: searchQLTinTuc_CommentDataType) => {
      dispatch(setIsLoading(true));
      try {
        const searchData = searchDataOverride || {
          pageIndex,
          pageSize,
          ...(searchValues || {}),
        };
        const response = await qLTinTuc_CommentService.getDataByPage(
          searchData
        );
        if (response != null && response.data != null) {
          const data = response.data;
          const items = data.items;
          setListQLTinTuc_Comment(items);
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
    QLTinTuc_Comment?: tableQLTinTuc_CommentDataType
  ) => {
    setIsOpenModal(true);
    if (isEdit) {
      setCurrentQLTinTuc_Comment(QLTinTuc_Comment);
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleCloseDetail = () => {
    setIsOpenDetail(false);
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
            className={classes.mgright5 + classes.colorKetXuat}
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
          QLTinTuc_Comment={currentQLTinTuc_Comment}
        />
      </Flex>
      {isPanelVisible && <Search onFinish={onFinishSearch} />}
      <QLTinTuc_CommentDetail
        qLTinTuc_Comment={currentDetailQLTinTuc_Comment}
        isOpen={isOpenDetail}
        onClose={handleCloseDetail}
      />
      <Card style={{ padding: "0px" }} className={classes.customCardShadow}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={listQLTinTuc_Comment}
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

export default withAuthorization(QLTinTuc_Comment, "QLTinTuc_Comment_index");
