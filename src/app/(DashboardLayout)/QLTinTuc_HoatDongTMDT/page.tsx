"use client";
import Flex from "@/components/shared-components/Flex";
import {
  searchQLTinTucData,
  tableQLTinTucDataType,
} from "@/interface/qlTinTuc/qlTinTuc";
import {
  DropdownOption,
  DropdownOptionAntd,
  Response,
  ResponsePageInfo,
  ResponsePageList,
} from "@/interface/general";
import withAuthorization from "@/libs/authentication";
import { qlTinTucService } from "@/services/qlTinTuc/qlTinTuc.service";
import { setIsLoading } from "@/store/general/GeneralSlice";

import {
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  PrinterOutlined,
  BarcodeOutlined,
  EyeOutlined,
  Loading3QuartersOutlined,
  SettingOutlined,
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
  Image,
  Tag,
} from "antd";
import { useCallback, useEffect, useState } from "react";
//import { useDispatch } from 'react-redux'
import classes from "./page.module.css";
import { toast } from "react-toastify";
import Search from "./search";
import { duLieuDanhMucService } from "@/services/duLieuDanhMuc/duLieuDanhMuc.service";
import DanhMucConstant from "@/constants/DanhMucConstant";
import LoaiTinTucConstant from "@/constants/LoaiTinTucConstant";
import ThongKeThongTin from "./thongkethongtin";
import QLTinTucDetail from "./detail";
import { chuyenMucService } from "@/services/ChuyenMuc/ChuyenMuc.service";
import { qLTinTuc_TagService } from "@/services/QLTinTuc_Tag/QLTinTuc_Tag.service";
import { useRouter } from "next/navigation";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import formatDate from "@/utils/formatDate";
import { useDispatch, useSelector } from "@/store/hooks";
import { reset, setTinTuc } from "@/store/QLTinTuc/tinTucSlice";
import ChuyenMucTinTucConstant from "@/constants/ChuyenMucTinTucConstant";

const StaticFileUrl = process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL;

const QLTinTuc_HoatDongTMDT: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [listTinTucs, setListqlTinTuc] = useState<tableQLTinTucDataType[]>([]);
  const [dataPage, setDataPage] = useState<ResponsePageInfo>();
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
  const [searchValues, setSearchValues] = useState<searchQLTinTucData | null>(
    null
  );
  const loading = useSelector((state) => state.general.isLoading);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentTinTuc, setCurrentTinTuc] =
    useState<tableQLTinTucDataType | null>(null);
  const [currentloaiTinTuc, setloaiTinTuc] = useState<string | null>(null);
  const [dropdownTrangThaiTinTuc, setDropdownTrangThaiTinTuc] = useState<
    DropdownOptionAntd[]
  >([]);

  const [dropDownChuyenMuc, setDropDownChuyenMuc] = useState<DropdownOption[]>(
    []
  );

  const [dropdownTag, setDropDownTag] = useState<DropdownOption[]>();

  const [isThongKeThongTin, setThongKeThongTin] = useState<boolean>(false);
  const [currentDetailQLTinTuc, setCurrentDetailQLTinTuc] =
    useState<tableQLTinTucDataType>();
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  //ẩn hiện cấu hình reaction
  const [isOpenReaction, setIsOpenReaction] = useState<boolean>(false);
  const [idChuyenMuc, setIdChuyenMuc] = useState<string>("");
  const [openPopconfirmId, setOpenPopconfirmId] = useState<string | null>(null);

  const tableColumns: TableProps<tableQLTinTucDataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      align: "center",
      render: (_: any, record: tableQLTinTucDataType) => {
        return record.thumbnail ? (
          <div>
            <Image
              alt="img"
              style={{ maxWidth: "60px" }}
              className="img-fluid"
              src={`${StaticFileUrl}${record.thumbnail}`}
              fallback="/img/others/notfoundimage.png"
              preview={true}
            />
          </div>
        ) : (
          <></>
        );
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      width: "20%",
      render: (_: any, record: tableQLTinTucDataType) => (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {record.title}
        </div>
      ),
    },
    {
      title: "Chuyên mục tin",
      dataIndex: "keyWord",
      width: "15%",
      render: (_: any, record: tableQLTinTucDataType) => {
        return record.chuyenMucNames && record.chuyenMucNames.length > 0 ? (
          <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
            {record.chuyenMucNames.map((cm) => (
              <Tag key={cm} color="geekblue">
                {cm}
              </Tag>
            ))}
          </div>
        ) : (
          <></>
        );
      },
    },

    {
      title: "Tag",
      width: "15%",
      render: (_: any, record: tableQLTinTucDataType) => {
        return record.tagNames && record.tagNames.length > 0 ? (
          <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
            {record.tagNames.map((tag) => (
              <Tag key={tag} color="geekblue">
                {tag}
              </Tag>
            ))}
          </div>
        ) : (
          <></>
        );
      },
    },
    {
      title: "Nổi bật",
      dataIndex: "isHot",
      align: "center",
      render: (_: any, record: tableQLTinTucDataType) => (
        <span
          style={{
            fontSize: "25px",
            color: record.isHot ? "green" : "red",
          }}
        >
          {record.isHot ? <CheckCircleOutlined /> : null}
        </span>
      ),
    },
    {
      title: "Ngày phát hành",
      dataIndex: "publicDate",
      render: (_: any, record: tableQLTinTucDataType) =>
        record.publicDate ? (
          <span>{formatDate(new Date(record.publicDate))}</span>
        ) : (
          <></>
        ),
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      fixed: "right",
      render: (_: any, record: tableQLTinTucDataType) => {
        const items: MenuProps["items"] = [
          {
            label: "Chi tiết",
            key: "7",
            icon: <EyeOutlined />,
            onClick: () => {
              setCurrentDetailQLTinTuc(record);
              setIsOpenDetail(true);
            },
          },
          {
            label: "Chỉnh sửa",
            key: "3",
            icon: <EditOutlined />,
            onClick: () => {
              // handleShowModal(true, record, record.loaiTin ?? undefined)
              dispatch(setTinTuc(record));
              router.push("/QLTinTuc/create");
            },
          },
          {
            label: "Cấu hình reaction",
            key: "4",
            icon: <SettingOutlined />,
            onClick: () => {
              setIsOpenReaction(true);
              setCurrentTinTuc(record);
            },
          },
          {
            label: "Cập nhật slug title",
            key: "8",
            icon: <Loading3QuartersOutlined />,
            onClick: () => {
              handleTitleToSlugqlTinTuc(record.id);
            },
          },
          {
            label: "In thông tin",
            key: "5",
            icon: <PrinterOutlined />,
            onClick: () => {
              handlePrintTinTuc(record);
            },
            style: record.loaiTin === "tintuc" ? {} : { display: "none" },
          },
          {
            label: "Xóa",
            key: "5",
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
              key={`Delete${record.id}`}
              title="Xác nhận xóa"
              description={
                <span>
                  {record.loaiTin === "tintuc"
                    ? "Bạn có muốn xóa tin tức này không?"
                    : "Bạn có muốn xóa thông báo này không?"}
                  <br /> Sau khi xóa sẽ không thể khôi phục.
                </span>
              }
              okText="Xóa"
              cancelText="Hủy"
              open={openPopconfirmId === record.id}
              onConfirm={() => {
                handleDeleteqlTinTuc(record.id || "");
                setOpenPopconfirmId(null);
              }}
              onCancel={() => setOpenPopconfirmId(null)}
            ></Popconfirm>
          </>
        );
      },
    },
  ];

  const handleGetDropDownChuyenMuc = useCallback(async () => {
    try {
      const response = await chuyenMucService.GetDropDown();
      if (response.status) {
        setDropDownChuyenMuc(response.data);
      }
    } catch (err) {
      setDropDownChuyenMuc([]);
    }
  }, []);

  const handleGetIdChuyenMucByCode = useCallback(async () => {
    try {
      const response = await chuyenMucService.GetChuyenMucByCode(
        ChuyenMucTinTucConstant.GiamSatTMDT
      );
      if (response.status) {
        setIdChuyenMuc(response.data);
      }
    } catch (err) {
      toast.error("Có lỗi: " + err);
    }
  }, []);

  const handleGetDropDownTag = useCallback(async () => {
    try {
      const response = await qLTinTuc_TagService.GetDropDown();
      if (response.status) {
        setDropDownTag(response.data);
      }
    } catch (error) {
      setDropDownTag([]);
    }
  }, []);

  const hanleCreateEditSuccess = () => {
    handleGetListqlTinTuc();
    setCurrentTinTuc(null);
  };

  const handleDeleteqlTinTuc = async (id: string) => {
    try {
      const response = await qlTinTucService.Delete(id);
      if (response.status) {
        toast.success("Xóa thành công");
        handleGetListqlTinTuc();
      } else {
        toast.error("Xóa thất bại");
      }
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };

  const handleTitleToSlugqlTinTuc = async (id: string | undefined) => {
    try {
      const response = await qlTinTucService.TitleToSlug(id);
      if (response.status) {
        toast.success("Cập nhật SlugTitle thành công");
        handleGetListqlTinTuc();
      } else {
        toast.error("Cập nhật SlugTitle thất bại");
      }
    } catch (error) {
      toast.error("Cập nhật SlugTitle thất bại");
    }
  };

  const getDropdown = async () => {
    try {
      const response = await duLieuDanhMucService.GetDropdown(
        DanhMucConstant.TrangThaiTinTuc
      );
      setDropdownTrangThaiTinTuc(response?.data);
    } catch (error) {}
  };

  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const onFinishSearch: FormProps<searchQLTinTucData>["onFinish"] = async (
    values
  ) => {
    try {
      setSearchValues(values);
      await handleGetListqlTinTuc(values);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

  const handleGetListqlTinTuc = useCallback(
    async (searchDataOverride?: searchQLTinTucData) => {
      dispatch(setIsLoading(true));
      try {
        const searchData = {
          pageIndex,
          pageSize,
          ...(searchValues || {}),
          ...(searchDataOverride || {}),
          chuyenMucs: [
            ChuyenMucTinTucConstant.GiamSatTMDT,
            ...((searchDataOverride?.chuyenMucs || []).includes(
              ChuyenMucTinTucConstant.GiamSatTMDT
            )
              ? []
              : searchDataOverride?.chuyenMucs || []),
          ],
        };

        const response: Response = await qlTinTucService.getDataByPage(
          searchData
        );
        if (response?.data) {
          const data: ResponsePageList = response.data;
          setListqlTinTuc(data.items);
          setDataPage({
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            totalCount: data.totalCount,
            totalPage: data.totalPage,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [pageIndex, pageSize]
  );

  const handleShowModal = (
    isEdit?: boolean,
    qlTinTuc?: tableQLTinTucDataType,
    isTinTuc?: string
  ) => {
    setloaiTinTuc(isTinTuc ?? "");
    setIsOpenModal(true);
    if (isEdit) {
      setCurrentTinTuc(qlTinTuc ?? null);
    }
  };

  const handlePrintTinTuc = (record: tableQLTinTucDataType) => {
    const status = dropdownTrangThaiTinTuc.find(
      (item) => item.value === record.status
    );
    const imageUrl = record.image
      ? `${StaticFileUrl}/${record.image}`
      : "/img/others/notfoundimage.png";
    const content = `
            <div>
                <h2>Thông tin ${
                  LoaiTinTucConstant.getDropdownList().find(
                    (item) => item.value === record.loaiTin
                  )?.label
                }</h2>
                <p><strong>Tiêu đề:</strong> ${record.title}</p>
                <p><strong>Từ khóa:</strong> ${record.keywords ?? ""}</p>
                <p><strong>Mô tả:</strong> ${record.description ?? ""}</p>
                <p><strong>Hình ảnh:</strong></p>
                <img src="${imageUrl}" style="width: 200px; height: auto;" alt="Hình ảnh tin tức" />
                <p><strong>Trạng thái:</strong> ${
                  status ? status.label : ""
                }</p>
                <p><strong>Nổi bật:</strong> ${
                  record.isHot ? "Có" : "Không"
                }</p>
                <p><strong>Ngày phát hành:</strong> ${
                  record.publicDate
                    ? new Date(record.publicDate).toLocaleDateString("vi-VN")
                    : ""
                }</p>
                <p><strong>Nội dung:</strong> ${record.content}</p>
            </div>
        `;

    // Tạo một iframe ẩn
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    // Lấy tài liệu của iframe
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (printWindow) {
      // Thêm nội dung vào phần tử body của cửa sổ
      printWindow.document.body.innerHTML = `
                <html>
                    <head>
                        <title>In thông tin tin tức</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            h2 { color: #333; }
                            img { width: 200px; height: auto; margin-top: 10px; }
                            p { margin: 5px 0; }
                        </style>
                    </head>
                    <body>
                        ${content}
                    </body>
                </html>
            `;

      // Đảm bảo tài liệu đã tải xong, rồi thực hiện in
      printWindow.document.close(); // Đóng tài liệu lại
      printWindow.print(); // In nội dung
      printWindow.close(); // Đóng cửa sổ sau khi in xong
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
    setCurrentTinTuc(null);
  };

  const handleCloseDetail = () => {
    setIsOpenDetail(false);
  };

  useEffect(() => {
    handleGetListqlTinTuc();
  }, [handleGetListqlTinTuc]);

  useEffect(() => {
    handleGetDropDownChuyenMuc();
    handleGetIdChuyenMucByCode();
    handleGetDropDownTag();
    getDropdown();
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
              setThongKeThongTin(true);
            }}
            type="primary"
            icon={<BarcodeOutlined />}
            size="small"
            className={classes.mgright5}
          >
            Thống kê thông tin
          </Button>
          <Button
            onClick={() => {
              //handleShowModal();
              dispatch(reset());
              router.push(`/QLTinTuc/create?chuyenMuc=${idChuyenMuc}`);
            }}
            type="primary"
            icon={<PlusCircleOutlined />}
            size="small"
          >
            Thêm mới
          </Button>

          <ThongKeThongTin
            isOpen={isThongKeThongTin}
            onSuccess={hanleCreateEditSuccess}
            onClose={() => setThongKeThongTin(false)}
          />
        </div>
      </Flex>
      {isPanelVisible && (
        <Search
          onFinish={onFinishSearch}
          pageIndex={pageIndex}
          pageSize={pageSize}
          dropdown={dropdownTrangThaiTinTuc}
        />
      )}
      <QLTinTucDetail
        qltintuc={currentDetailQLTinTuc}
        isOpen={isOpenDetail}
        onClose={handleCloseDetail}
        dropdown={dropdownTrangThaiTinTuc}
      />
      <Card style={{ padding: "0px" }} className={classes.customCardShadow}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={listTinTucs}
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

export default withAuthorization(QLTinTuc_HoatDongTMDT, "");
