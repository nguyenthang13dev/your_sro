import React, { useEffect, useState } from "react";
import { Image, Modal, Table, Tag } from "antd";
import { toast } from "react-toastify";
import { daiDienThuongHieuService } from "@/services/daiDienThuongHieu/daiDienThuongHieu.service";
import DaiDienThuongHieu from "@/interface/daiDienThuongHieu/daiDienThuongHieu";

interface UserViewProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
}

const DetailSoHuuTriTueComponet: React.FC<UserViewProps> = ({
  id,
  isOpen,
  onClose,
}) => {
  const [detail, setDetai] = useState<DaiDienThuongHieu>();

  const columns = [
    {
      title: "Trường",
      dataIndex: "field",
      key: "field",
      width: 150,
    },
    {
      title: "Nội dung",
      dataIndex: "value",
      key: "value",
    },
  ];

  const data = [
    {
      key: "1",
      field: "Loại",
      value: detail?.loai || "",
    },
    {
      key: "2",
      field: "Tên đại diện",
      value: detail?.tenDaiDien || "",
    },
    { key: "5", field: "Mã số thuế", value: detail?.maSoThue || "" },
    { key: "8", field: "Mô tả", value: detail?.moTa || "" },
    { key: "9", field: "Số điện thoại", value: detail?.sdt || "" },
    { key: "3", field: "Căn cước công dân", value: detail?.cccd || "" },
  ];

  const handleGetDetail = async () => {
    try {
      const res = await daiDienThuongHieuService.getById(id ?? "");

      if (res.status) {
        setDetai(res.data);
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra: " + err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleGetDetail();
    }
  }, [isOpen]);

  return (
    <Modal
      title="Chi tiết sở hữu trí tuệ"
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Table
        columns={columns}
        bordered
        dataSource={data}
        rowKey="key"
        pagination={false}
        tableLayout="fixed"
        showHeader={false}
      />
    </Modal>
  );
};

export default DetailSoHuuTriTueComponet;
