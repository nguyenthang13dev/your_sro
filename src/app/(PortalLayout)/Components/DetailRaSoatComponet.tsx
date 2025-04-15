import React, { useEffect, useState } from "react";
import { Image, Modal, Table, Tag } from "antd";
import { toast } from "react-toastify";
import { raSoatService } from "@/services/RaSoat/RaSoat.service";
import { tableRaSoatDataType } from "@/interface/RaSoat/RaSoat";

interface UserViewProps {
  idCanhBao?: string;
  isOpen: boolean;
  onClose: () => void;
}

const DetailRaSoatComponet: React.FC<UserViewProps> = ({
  idCanhBao,
  isOpen,
  onClose,
}) => {
  const [detail, setDetai] = useState<tableRaSoatDataType>();

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
      key: "2",
      field: detail?.tenWebsite ? "Tên website" : "Tên sản phẩm",
      value: detail?.tenWebsite || detail?.tenSanPham || "",
    },
    { key: "7", field: "Tên rà soát", value: detail?.tenRaSoat || "" },
    { key: "3", field: "Nội dung xử lý", value: detail?.noiDungXuLy || "" },
    { key: "4", field: "Tên đại diện", value: detail?.tenDaiDien || "" },
    { key: "5", field: "Mã số thuế", value: detail?.maSoThue || "" },
    { key: "8", field: "Địa chỉ", value: detail?.diaChiDN || "" },
    { key: "9", field: "Số điện thoại", value: detail?.sdtDN || "" },
  ];

  const handleGetDetail = async () => {
    try {
      const res = await raSoatService.getDetailCanhBao(idCanhBao ?? "");

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
      title="Chi tiết cảnh báo"
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Table
        columns={columns}
        bordered
        dataSource={data.filter((item) => item.key !== "2")}
        rowKey="key"
        pagination={false}
        tableLayout="fixed"
        showHeader={false}
      />
    </Modal>
  );
};

export default DetailRaSoatComponet;
