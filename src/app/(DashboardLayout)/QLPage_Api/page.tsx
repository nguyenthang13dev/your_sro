"use client";
import Flex from "@/components/shared-components/Flex";
import {
    searchQLPage_ApiDataType,
    tableQLPage_ApiDataType,
} from "@/interface/QLPage_Api/QLPage_Api";
import { DropdownOptionAntd, ResponsePageInfo } from "@/interface/general";
import withAuthorization from "@/libs/authentication";
import { qLPage_ApiService } from "@/services/QLPage_Api/QLPage_Api.service";
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
    Tag,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import Search from "./search";
import CreateOrUpdate from "./createOrUpdate";
import { toast } from "react-toastify";
import QLPage_ApiDetail from "./detail";
import classes from "./page.module.css";

const methodColors: Record<string, string> = {
    GET: "green",
    POST: "blue",
    PUT: "orange",
    DELETE: "red",
};

const QLPage_Api: React.FC = () => {
    const dispatch = useDispatch();
    const [listQLPage_Api, setListQLPage_Api] = useState<
        tableQLPage_ApiDataType[]
    >([]);
    const [dataPage, setDataPage] = useState<ResponsePageInfo>();
    const [pageSize, setPageSize] = useState<number>(20);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
    const [searchValues, setSearchValues] =
        useState<searchQLPage_ApiDataType | null>(null);
    const loading = useSelector((state) => state.general.isLoading);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [currentQLPage_Api, setCurrentQLPage_Api] =
        useState<tableQLPage_ApiDataType>();
    const [currentDetailQLPage_Api, setCurrentDetailQLPage_Api] =
        useState<tableQLPage_ApiDataType>();
    const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);

    const [dropDownDanhMuc, setDropDownDanhMuc] = useState<
        DropdownOptionAntd[]
    >([]);
    const tableColumns: TableProps<tableQLPage_ApiDataType>["columns"] = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (_: any, record: tableQLPage_ApiDataType) => (
                <Tag color="blue">{record?.name}</Tag>
            ),
        },
        {
            title: "Api",
            dataIndex: "api",
            render: (_: any, record: tableQLPage_ApiDataType) => (
                <Tag color="blue">{record.api}</Tag>
            ),
        },
        {
            title: "Method",
            dataIndex: "method",
            render: (_: any, record: tableQLPage_ApiDataType) => (
                <Tag color={methodColors[record.method] || "default"}>
                    {record.method}
                </Tag>
            ),
        },
        {
            title: "Dùng trong khai thác",
            dataIndex: "isKhaiThac",
            render: (_: any, record: tableQLPage_ApiDataType) => (
                <Tag color={record?.isKhaiThac ? "blue" : "red"}>
                    {record?.isKhaiThac ? "Có" : "Không"}
                </Tag>
            ),
        },
        {
            title: "Kiểu table",
            dataIndex: "isTable",
            render: (_: any, record: tableQLPage_ApiDataType) => (
                <Tag color={record?.isTable ? "blue" : "red"}>
                    {record?.isTable ? "Có" : "Không"}
                </Tag>
            ),
        },
        {
            title: "Thao tác",
            dataIndex: "actions",
            fixed: "right",
            render: (_: any, record: tableQLPage_ApiDataType) => {
                const items: MenuProps["items"] = [
                    {
                        label: "Chi tiết",
                        key: "1",
                        icon: <EyeOutlined />,
                        onClick: () => {
                            setCurrentDetailQLPage_Api(record);
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
                                        Bạn có muốn xóa dữ liệu này không?{" "}
                                        <br /> Sau khi xóa sẽ không thể khôi
                                        phục.
                                    </span>
                                }
                                okText="Xóa"
                                cancelText="Hủy"
                                onConfirm={() => {
                                    handleDeleteQLPage_Api(record.id || "");
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

    const handleDeleteQLPage_Api = async (id: string) => {
        try {
            const response = await qLPage_ApiService.Delete(id);
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

    const onFinishSearch: FormProps<searchQLPage_ApiDataType>["onFinish"] =
        async (values) => {
            try {
                setSearchValues(values);
                await handleGetList(values);
            } catch (error) {
                console.error("Lỗi khi lưu dữ liệu:", error);
            }
        };

    const handleGetList = useCallback(
        async (searchDataOverride?: searchQLPage_ApiDataType) => {
            dispatch(setIsLoading(true));
            try {
                const searchData = searchDataOverride || {
                    pageIndex,
                    pageSize,
                    ...(searchValues || {}),
                };
                const response = await qLPage_ApiService.getDataByPage(
                    searchData,
                );
                if (response != null && response.data != null) {
                    const data = response.data;
                    const items = data.items;
                    setListQLPage_Api(items);
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
        [pageIndex, pageSize],
    );

    const handleShowModal = (
        isEdit?: boolean,
        QLPage_Api?: tableQLPage_ApiDataType,
    ) => {
        setIsOpenModal(true);
        if (isEdit) {
            setCurrentQLPage_Api(QLPage_Api);
        }
    };

    const handleClose = () => {
        setIsOpenModal(false);
    };

    const handleCloseDetail = () => {
        setIsOpenDetail(false);
    };

    const handleDropDownDto = useCallback(async () => {
        try {
            const data = await qLPage_ApiService.GetDropDownDtos();
            setDropDownDanhMuc(data.data);
        } catch (error) {
            toast.error("");
        }
    }, []);

    useEffect(() => {
        handleGetList();
        handleDropDownDto();
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
                    icon={
                        isPanelVisible ? <CloseOutlined /> : <SearchOutlined />
                    }
                    className={classes.mgright5}
                >
                    {isPanelVisible ? "Ẩn tìm kiếm" : "Tìm kiếm"}
                </Button>

                <Button
                    onClick={() => {
                        handleShowModal();
                    }}
                    type="primary"
                    className="mx-2"
                    icon={<PlusCircleOutlined />}
                    size="small"
                >
                    Thêm mới
                </Button>

                <CreateOrUpdate
                    isOpen={isOpenModal}
                    onSuccess={hanleCreateEditSuccess}
                    onClose={handleClose}
                    QLPage_Api={currentQLPage_Api}
                    dropDownDanhMuc={dropDownDanhMuc}
                />
            </Flex>
            {isPanelVisible && <Search onFinish={onFinishSearch} />}
            <QLPage_ApiDetail
                qLPage_Api={currentDetailQLPage_Api}
                isOpen={isOpenDetail}
                onClose={handleCloseDetail}
            />
            <Card
                style={{ padding: "0px" }}
                className={classes.customCardShadow}
            >
                <div className="table-responsive">
                    <Table
                        columns={tableColumns}
                        bordered
                        dataSource={listQLPage_Api}
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
                        range[0] +
                        "-" +
                        range[1] +
                        " trong " +
                        total +
                        " dữ liệu"
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

export default withAuthorization(QLPage_Api, "");
