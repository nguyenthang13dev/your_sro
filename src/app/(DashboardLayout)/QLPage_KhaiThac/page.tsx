"use client";

import Flex from "@/components/shared-components/Flex";
import { DropdownOption, ResponsePageInfo } from "@/interface/general";
import withAuthorization from "@/libs/authentication";
import { setIsLoading } from "@/store/general/GeneralSlice";
import { useDispatch, useSelector } from "@/store/hooks";
import classes from "./import.module.css";
import {
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
import { toast } from "react-toastify";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import {
    tableQLPage_KhaiThacDataType,
    searchQLPage_KhaiThacDataType,
} from "@/interface/QLPage_KhaiThac/QLPage_KhaiThac";
import { QLPageKhaiThac } from "@/services/QLPage_KhaiThac/QLPage_KhaiThac.service";
import CreateOrUpdate from "./createOrUpdate";
import { KHAITHAC } from "@/constants/TypeCompoentConstant";
import { qLPage_ComponentService } from "@/services/QLPage_Component/QLPage_Component.service";
import { qLPage_ApiService } from "@/services/QLPage_Api/QLPage_Api.service";

const QLPage_KhaiThac: React.FC = () => {
    const dispatch = useDispatch();
    const [listQLPage_Component, setListQLPage_Component] = useState<
        tableQLPage_KhaiThacDataType[]
    >([]);
    const [dataPage, setDataPage] = useState<ResponsePageInfo>();
    const [pageSize, setPageSize] = useState<number>(20);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
    const [searchValues, setSearchValues] =
        useState<searchQLPage_KhaiThacDataType | null>(null);
    const loading = useSelector((state) => state.general.isLoading);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const [dropDownOption, setDropDonwOption] = useState<DropdownOption[]>([]);

    const [currentQLPage_KhaiThac, setCurrentQLPage_KhaiThac] =
        useState<tableQLPage_KhaiThacDataType>();
    const [currentDetailQLPage_KhaiThac, setCurrentDetailQLPage_KhaiThac] =
        useState<tableQLPage_KhaiThacDataType>();
    const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);

    const [dropDownApi, setDropDownApi] = useState<DropdownOption[]>([]);

    const tableColumns: TableProps<tableQLPage_KhaiThacDataType>["columns"] = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Code",
            dataIndex: "code",
            render: (_: any, record: tableQLPage_KhaiThacDataType) => (
                <span>{record.code}</span>
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (_: any, record: tableQLPage_KhaiThacDataType) => (
                <span>{record.name}</span>
            ),
        },
        {
            title: "Api",
            dataIndex: "api",
            render: (_: any, record: tableQLPage_KhaiThacDataType) => (
                <span>{record.api}</span>
            ),
        },
        // {
        //     title: "Hiển thị dạng bảng",
        //     dataIndex: "isTable",
        //     render: (_: any, record: tableQLPage_KhaiThacDataType) => (
        //         <span>{record.isTable}</span>
        //     ),
        // },
        // {
        //     title: "Có phân trang?",
        //     dataIndex: "isPagination",
        //     render: (_: any, record: tableQLPage_KhaiThacDataType) => (
        //         <span>{record.isPagination}</span>
        //     ),
        // },
        // {
        //     title: "Có tìm kiếm?",
        //     dataIndex: "isSearch",
        //     render: (_: any, record: tableQLPage_KhaiThacDataType) => (
        //         <span>{record.isSearch}</span>
        //     ),
        // },
        {
            title: "Thao tác",
            dataIndex: "actions",
            fixed: "right",
            render: (_: any, record: tableQLPage_KhaiThacDataType) => {
                const items: MenuProps["items"] = [
                    {
                        label: "Chi tiết",
                        key: "1",
                        icon: <EyeOutlined />,
                        onClick: () => {
                            setCurrentDetailQLPage_KhaiThac(record);
                            setIsOpenDetail(true);
                        },
                    },
                    {
                        label: "Chỉnh sửa",
                        key: "2",
                        icon: <EditOutlined />,
                        onClick: () => {
                            handleShowModal(true, record);
                            setCurrentQLPage_KhaiThac(record);
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
                                    handleDeleteQLPage_Component(
                                        record.id || "",
                                    );
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
            const response = await QLPageKhaiThac.Delete(id);
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

    const handleDropCode = useCallback(async () => {
        try {
            const response = await qLPage_ComponentService.GetDropdownCode(
                KHAITHAC,
            );
            setDropDonwOption(response.data);
        } catch (err) {
            toast.error("Có lỗi xảy ra");
        }
    }, []);

    const handleDropDownOption = useCallback(async () => {
        try {
            const dataDropDown = await qLPage_ApiService.GetDropDownApi();
            setDropDownApi(dataDropDown.data);
        } catch (error) {
            toast.error("Lấy danh mục api không thành công");
        }
    }, []);

    const toggleSearch = () => {
        setIsPanelVisible(!isPanelVisible);
    };

    const onFinishSearch: FormProps<searchQLPage_KhaiThacDataType>["onFinish"] =
        async (values) => {
            try {
                setSearchValues(values);
                await handleGetList(values);
            } catch (error) {
                console.error("Lỗi khi lưu dữ liệu:", error);
            }
        };

    const handleGetList = useCallback(
        async (searchDataOverride?: searchQLPage_KhaiThacDataType) => {
            dispatch(setIsLoading(true));
            try {
                const searchData = searchDataOverride || {
                    pageIndex,
                    pageSize,
                    ...(searchValues || {}),
                };
                const response = await QLPageKhaiThac.getDataByPage(searchData);
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
        [pageIndex, pageSize],
    );

    const handleShowModal = (
        isEdit?: boolean,
        QLPage_Component?: tableQLPage_KhaiThacDataType,
    ) => {
        setIsOpenModal(true);
        if (isEdit) {
            setCurrentDetailQLPage_KhaiThac(QLPage_Component);
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
        handleDropCode();
        handleDropDownOption();
    }, [handleGetList, handleDropCode, handleDropDownOption]);

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
                        icon={
                            isPanelVisible ? (
                                <CloseOutlined />
                            ) : (
                                <SearchOutlined />
                            )
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
                        icon={<PlusCircleOutlined />}
                        size="small"
                    >
                        Thêm mới
                    </Button>
                    <CreateOrUpdate
                        isOpen={isOpenModal}
                        onSuccess={hanleCreateEditSuccess}
                        onClose={handleClose}
                        QLPage_KhaiThac={currentQLPage_KhaiThac}
                        dropDownOption={dropDownOption}
                        dropDownOptionApi={dropDownApi}
                    />
                </div>
            </Flex>
            {isPanelVisible && <Search onFinish={onFinishSearch} />}

            <Card
                style={{ padding: "0px" }}
                className={classes.customCardShadow}
            >
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

export default withAuthorization(QLPage_KhaiThac, "");
