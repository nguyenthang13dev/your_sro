"use client";
import Flex from "@/components/shared-components/Flex";
import {
  searchQLPage_ComponentDataType,
  tableQLPage_ComponentDataType,
} from "@/interface/QLPage_Component/QLPage_Component";
import { DropdownOption, ResponsePageInfo } from "@/interface/general";
import withAuthorization from "@/libs/authentication";
import { qLPage_ComponentService } from "@/services/QLPage_Component/QLPage_Component.service";
import { setIsLoading } from "@/store/general/GeneralSlice";
import { useDispatch, useSelector } from "@/store/hooks";
import classes from "./import.module.css";
import {
  CloseOutlined,
  CopyOutlined,
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
  FormProps,
  Image,
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
import QLPage_ComponentDetail from "./detail";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
const StaticFileUrl = process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL;

const PageComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [listQLPage_Component, setListQLPage_Component] = useState<
    tableQLPage_ComponentDataType[]
  >([]);
  const [dataPage, setDataPage] = useState<ResponsePageInfo>();
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
  const [searchValues, setSearchValues] =
    useState<searchQLPage_ComponentDataType | null>(null);
  const loading = useSelector((state) => state.general.isLoading);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentQLPage_Component, setCurrentQLPage_Component] =
    useState<tableQLPage_ComponentDataType>();
  const [currentDetailQLPage_Component, setCurrentDetailQLPage_Component] =
    useState<tableQLPage_ComponentDataType>();
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);

  const [dropdown, setDropdown] = useState<DropdownOption[]>([]);

  const tableColumns: TableProps<tableQLPage_ComponentDataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "logo",
      render: (_: any, record: tableQLPage_ComponentDataType) => {
        return record.image ? (
          <Image
            alt="img"
            src={`${StaticFileUrl}${record.image}`}
            style={{
              maxWidth: "100px",
            }}
          />
        ) : (
          <></>
        );
      },
    },
    {
      title: "Code",
      dataIndex: "code",
      render: (_: any, record: tableQLPage_ComponentDataType) => (
        <span>{record.code}</span>
      ),
    },
    {
      title: "Type",
      dataIndex: "nameType",
      render: (_: any, record: tableQLPage_ComponentDataType) => (
        <span>{record.nameType}</span>
      ),
    },
    {
      title: "Api",
      dataIndex: "api",
      render: (_: any, record: tableQLPage_ComponentDataType) => (
        <span>{record.api}</span>
      ),
    },
    {
      title: "Elements",
      dataIndex: "elements",
      render: (_: any, record: tableQLPage_ComponentDataType) => (
        <span>{record.elements}</span>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      fixed: "right",
      render: (_: any, record: tableQLPage_ComponentDataType) => {
        const items: MenuProps["items"] = [
          {
            label: "Chi tiết",
            key: "1",
            icon: <EyeOutlined />,
            onClick: () => {
              setCurrentDetailQLPage_Component(record);
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
            label: "Tạo bản sao",
            key: "3",
            icon: <CopyOutlined />,
            onClick: () => {
              handleClone(record.id!);
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
                  handleDeleteQLPage_Component(record.id || "");
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

  const handleDeleteQLPage_Component = async (id: string) => {
    try {
      const response = await qLPage_ComponentService.Delete(id);
      if (response.status) {
        toast.success("Xóa component thành công");
        handleGetList();
      } else {
        toast.error("Xóa component thất bại");
      }
    } catch (error) {
      toast.error("Xóa component thất bại");
    }
  };

  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const handleGetDropDown = useCallback(async () => {
    try {
      const response = await qLPage_ComponentService.GetDropDown();
      setDropdown(response.data);
    } catch (err) {
      toast.error("Lấy dữ liệu thất bại: " + err);
    }
  }, []);

  const onFinishSearch: FormProps<searchQLPage_ComponentDataType>["onFinish"] =
    async (values) => {
      try {
        setSearchValues(values);
        await handleGetList(values);
      } catch (error) {
        console.error("Lỗi khi lưu dữ liệu:", error);
      }
    };

  const handleGetList = useCallback(
    async (searchDataOverride?: searchQLPage_ComponentDataType) => {
      dispatch(setIsLoading(true));
      try {
        const searchData = searchDataOverride || {
          pageIndex,
          pageSize,
          ...(searchValues || {}),
        };
        const response = await qLPage_ComponentService.getDataByPage(
          searchData
        );
        if (response != null && response.data != null) {
          const data = response.data;
          const items = data.items;
          setListQLPage_Component(items);
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
    QLPage_Component?: tableQLPage_ComponentDataType
  ) => {
    setIsOpenModal(true);
    if (isEdit) {
      setCurrentQLPage_Component(QLPage_Component);
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleCloseDetail = () => {
    setIsOpenDetail(false);
  };

  const handleClone = async (id: string) => {
    try {
      const response = await qLPage_ComponentService.clone(id);
      if (response.status) {
        toast.success(response.message);
        handleGetList();
      } else {
        toast.error("Có lỗi xày ra, vui lòng thử lại");
        console.error(response.message);
      }
    } catch (ex) {
      toast.error("Có lỗi xày ra, vui lòng thử lại");
      console.error(ex);
    }
  };

  useEffect(() => {
    handleGetList();
    handleGetDropDown();
  }, [handleGetList]);

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="end"
        className={classes.mgButton10}
      >
        {/* <AutoBreadcrumb /> */}

        <div>
          {/* <Button
            onClick={() => toggleSearch()}
            type="primary"
            size="small"
            icon={isPanelVisible ? <CloseOutlined /> : <SearchOutlined />}
            className={classes.mgright5}
          >
            {isPanelVisible ? 'Ẩn tìm kiếm' : 'Tìm kiếm'}
          </Button> */}

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
            QLPage_Component={currentQLPage_Component}
            dropdownType={dropdown}
          />
        </div>
      </Flex>
      {/* {isPanelVisible && <Search onFinish={onFinishSearch} />} */}
      <QLPage_ComponentDetail
        qLPage_Component={currentDetailQLPage_Component}
        isOpen={isOpenDetail}
        onClose={handleCloseDetail}
      />
      <Card style={{ padding: "0px" }} className={classes.customCardShadow}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={listQLPage_Component}
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

export default withAuthorization(PageComponent, "");
