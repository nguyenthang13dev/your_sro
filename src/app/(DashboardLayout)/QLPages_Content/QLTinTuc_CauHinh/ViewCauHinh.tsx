import { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Dropdown,
  Drawer,
  Popconfirm,
  Space,
} from "antd";
import {
  EllipsisOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { qLTinTuc_CauHinhService } from "@/services/QLTinTuc_CauHinh/QLTinTuc_CauHinh.service";
import { toast } from "react-toastify";
import { tableQLTinTuc_CauHinhDataType } from "@/interface/QLTinTuc_CauHinh/QLTinTuc_CauHinh";
import QLTinTuc_CauHinhDetail from "./detail";
import CreateOrUpdate from "./createOrUpdate";
import classes from "./page.module.css";
import { replaceCssToPreview, replaceHtmlToPreview } from "@/utils/string";

interface Pros {
  isOpen: boolean;
  onClose: () => void;
  isCauHinh: boolean;
  setTypePreview?: (item: tableQLTinTuc_CauHinhDataType) => void;
}

const ViewCauHinh: React.FC<Pros> = (props: Pros) => {
  const [dataCauHinh, setDataCauHinh] = useState<
    tableQLTinTuc_CauHinhDataType[]
  >([]);
  const [currentQLTinTuc_CauHinh, setCurrentQLTinTuc_CauHinh] =
    useState<tableQLTinTuc_CauHinhDataType>();
  const [currentDetailQLTinTuc_CauHinh, setCurrentDetailQLTinTuc_CauHinh] =
    useState<tableQLTinTuc_CauHinhDataType>();
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  // Handle card selection
  const handleCardSelect = (id: string) => {
    setSelectedCardId(id);

    if (selectedCardId === id) {
      setSelectedCardId(null);
    }
  };

  // Danh sách thao tác
  const getEllipsisMenu = (
    record: tableQLTinTuc_CauHinhDataType
  ): MenuProps => {
    return {
      items: [
        // {
        //   label: "Chi tiết",
        //   key: "1",
        //   icon: <EyeOutlined />,
        //   onClick: () => {
        //     setCurrentDetailQLTinTuc_CauHinh(record);
        //     setIsOpenDetail(true);
        //   },
        // },
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
                  Bạn có muốn xóa dữ liệu này không? <br /> Sau khi xóa sẽ không
                  thể khôi phục.
                </span>
              }
              okText="Xóa"
              cancelText="Hủy"
              onConfirm={() => {
                handleDeleteQLTinTuc_CauHinh(record.id || "");
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
      ],
    };
  };

  const handleGetDataCauHinh = async () => {
    try {
      const response = await qLTinTuc_CauHinhService.getAllCauHinh();
      if (response.status) {
        setDataCauHinh(response.data);
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra: " + err);
    }
  };

  const handleDeleteQLTinTuc_CauHinh = async (id: string) => {
    try {
      const response = await qLTinTuc_CauHinhService.Delete(id);
      if (response.status) {
        toast.success("Xóa cấu hình thành công");
        handleGetDataCauHinh();
      } else {
        toast.error("Xóa cấu hình thất bại");
      }
    } catch (error) {
      toast.error("Xóa cấu hình thất bại: " + error);
    }
  };

  const handleShowModal = (
    isEdit?: boolean,
    QLTinTuc_CauHinh?: tableQLTinTuc_CauHinhDataType
  ) => {
    setIsOpenModal(true);
    if (isEdit) {
      setCurrentQLTinTuc_CauHinh(QLTinTuc_CauHinh);
    }
  };

  const handleCloseDetail = () => {
    setIsOpenDetail(false);
  };

  const hanleCreateEditSuccess = () => {
    handleGetDataCauHinh();
  };

  const handleSetTypePreview = () => {
    if (props.setTypePreview) {
      const data = dataCauHinh.find((x) => x.id == selectedCardId);

      props.setTypePreview(data!);
      toast.success("Chọn kiểu hiển thị thành công");
      setSelectedCardId(null);
      props.onClose();
    }
  };

  useEffect(() => {
    if (props.isOpen) {
      handleGetDataCauHinh();
    }
  }, [props.isOpen]);

  return (
    <>
      <CreateOrUpdate
        isOpen={isOpenModal}
        onSuccess={hanleCreateEditSuccess}
        onClose={() => setIsOpenModal(false)}
        QLTinTuc_CauHinh={currentQLTinTuc_CauHinh}
      />

      <Drawer
        open={props.isOpen}
        onClose={props.onClose}
        width="80%"
        mask={true}
        extra={
          <Space>
            <Button
              onClick={() => handleShowModal()}
              type="primary"
              icon={<PlusCircleOutlined />}
              size="small"
              className={classes.cyanBtn}
            >
              Thêm mới
            </Button>
            {props.isCauHinh && (
              <Button
                onClick={() => handleSetTypePreview()}
                type="default"
                size="small"
                className={classes.greenBtn}
              >
                Chọn cấu hình
              </Button>
            )}
          </Space>
        }
      >
        <div style={{ padding: "24px", background: "#f5f5f5" }}>
          <Row gutter={[24, 24]}>
            {dataCauHinh.map((item) => (
              <Col span={12} key={item.id}>
                <Card
                  title={item.type}
                  hoverable
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    ...(props.isCauHinh && {
                      border:
                        selectedCardId === item.id
                          ? "2px solid #52c41a"
                          : "1px solid #f0f0f0",
                      background:
                        selectedCardId === item.id ? "#f6ffed" : "white",
                    }),
                  }}
                  onClick={() => handleCardSelect(item.id ?? "")}
                  extra={
                    <Dropdown
                      menu={getEllipsisMenu(item)}
                      trigger={["click"]}
                      placement="bottomRight"
                    >
                      <Button
                        type="text"
                        icon={<EllipsisOutlined style={{ fontSize: "20px" }} />}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Dropdown>
                  }
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `
                            <style>
                                ${replaceCssToPreview(item)}
                            </style>
                            ${replaceHtmlToPreview(item)}
                        `,
                    }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Drawer>

      <QLTinTuc_CauHinhDetail
        qLTinTuc_CauHinh={currentDetailQLTinTuc_CauHinh}
        isOpen={isOpenDetail}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default ViewCauHinh;
