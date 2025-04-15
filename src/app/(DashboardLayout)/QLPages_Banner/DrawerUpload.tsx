import UploadFiler from "@/libs/UploadFilter";
import {
  Drawer,
  Input,
  Button,
  Image,
  Modal,
  Form,
  Table,
  TableColumnsType,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { UploadFile } from "antd/lib";
import { TaiLieuDinhKem } from "@/interface/taiLieuDinhKem/taiLieuDinhKem";
import { DeleteOutlined } from "@ant-design/icons";
import { qlPages_BannerService } from "@/services/QLPages_Banner/QLPages_Banner.service";
import {
  PostDataImage,
  qlPages_BannerType,
  UploadedItem,
  createEditType,
} from "@/interface/QLPages_Banner/QLPages_Banner";
import { toast } from "react-toastify";
import PreviewBanner from "./previewBanner";

interface DrawerUploadProps {
  isOpen: boolean;
  handleSuccess: () => void;
  handleClose: () => void;
  item: qlPages_BannerType;
  totalFile: number;
}

const DrawerSlice: React.FC<DrawerUploadProps> = ({
  isOpen,
  handleSuccess,
  handleClose,
  item,
  totalFile,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadedData, setUploadedData] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedItem[]>([]);
  const [bannerPreview, setBannerPreview] = useState<qlPages_BannerType>(item);
  const [isShowPerview, setIsShowPreview] = useState<boolean>(false);

  const onUploadSuccess = (fileData: TaiLieuDinhKem[]) => {
    if (fileData.length > 0) {
      const newFiles = fileData.map((file) => ({
        id: file.id,
        link: "",
        duongDanFile: file.duongDanFile,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleLinkChange = (index: number, id: string, value: string) => {
    setUploadedFiles((prev) =>
      prev.map((file, i) =>
        i === index ? { ...file, id: id, link: value } : file
      )
    );
  };

  const handleDeleteFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const payload: PostDataImage = {
      id: item?.id || "",
      dataImage: uploadedFiles,
    };
    try {
      const response = await qlPages_BannerService.UpdateDataImage(payload);
      if (response.status) {
        toast.success("Cập nhật thành công");

        handleSuccess();
        setBannerPreview((prev) => ({
          ...prev,
          dataImage: uploadedFiles,
        }));
        // setIsShowPreview(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error);
    }
  };

  const tableColumns: TableColumnsType = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, __, index) => index + 1, // Hiển thị số thứ tự
    },
    {
      title: "Ảnh banner",
      dataIndex: "banner",
      key: "banner",
      render: (_, record) => (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/Uploads/${record.duongDanFile}`}
          alt="Banner"
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Đường dẫn",
      dataIndex: "link",
      key: "link",
      render: (_, record, index) => (
        <Input
          placeholder="Nhập đường dẫn đến trang"
          value={record.link || ""}
          onChange={(e) => handleLinkChange(index, record.id, e.target.value)}
          style={{ width: "90%" }}
        />
      ),
    },
    // {
    //   title: "Thứ tự banner",
    //   dataIndex: "order",
    //   key: "order",
    //   width: "10%",
    //   render: (_, record, index) => (
    //     <Input
    //       placeholder="Thứ tự"
    //       value={record.link || ""}
    //       onChange={(e) => handleLinkChange(index, record.id, e.target.value)}
    //     />
    //   ),
    // },
    {
      title: "Thao tác",
      dataIndex: "thaoTac",
      key: "thaoTac",
      render: (_, record, index) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteFile(index)}
        />
      ),
    },
  ];

  const handleGetBannerPrevew = async () => {
    setBannerPreview(item);
    setIsShowPreview(true);
  };

  useEffect(() => {
    if (item != null && isOpen) {
      setUploadedFiles(item?.dataImage || []);
      //setFileList();
    }
  }, [isOpen]);

  const handleCloseUpload = () => {
    setIsShowPreview(false);
    setFileList([]);
    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleCloseUpload}
      title="Cấu hình banner slice"
      width={"50%"}
      okText="Lưu"
      cancelText="Đóng"
      footer={[
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Lưu
        </Button>,
        <Button key="cancel" onClick={handleCloseUpload}>
          Đóng
        </Button>,
        <Button key="previewBanner" danger onClick={handleGetBannerPrevew}>
          Xem trước
        </Button>,
      ]}
    >
      <Form.Item label="Chọn ảnh cho banner" layout="vertical">
        <UploadFiler
          setUploadedData={setUploadedData}
          fileList={fileList}
          setFileList={setFileList}
          type="QLBANNER"
          maxFiles={totalFile}
          handleSuccess={onUploadSuccess}
        />
      </Form.Item>

      {uploadedFiles.length > 0 && (
        <>
          <div style={{ marginTop: 20 }}>
            <Table
              columns={tableColumns}
              bordered
              dataSource={uploadedFiles}
              rowKey="id"
              scroll={{ x: "max-content" }}
              pagination={false}
              tableLayout="fixed"
            />
          </div>
        </>
      )}
      {isShowPerview && <PreviewBanner data={bannerPreview!} />}
    </Modal>
  );
};

export default DrawerSlice;
