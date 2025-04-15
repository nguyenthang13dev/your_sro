import type React from "react";
import { Collapse, Typography } from "antd";
import type { CollapseProps } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { duLieuDanhMucService } from "@/services/duLieuDanhMuc/duLieuDanhMuc.service";
import { toast } from "react-toastify";

interface CauHoi {
  cauHoi: string;
  traLoi: string;
}

const FAQDropdownComponent: React.FC = () => {
  const [cauHoi, setCauHoi] = useState<CauHoi[]>([]);

  const getCauHoi = async () => {
    try {
      const res = await duLieuDanhMucService.GetCauHoiThuongGap();
      if (res.status) {
        setCauHoi(res.data);
      }
    } catch (err) {
      toast.error("Có lỗi: " + err);
    }
  };

  useEffect(() => {
    getCauHoi();
  }, []);

  const items = cauHoi.map((item, index) => ({
    key: String(index + 1),
    label: <span className="faq-label">{item.cauHoi}</span>,
    children: <p>{item.traLoi}</p>,
  }));

  return (
    <div
      className="faq-container"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <Collapse
        items={items}
        bordered={true}
        expandIconPosition="end"
        style={{
          backgroundColor: "#fff",
          borderRadius: "4px",
        }}
      />
    </div>
  );
};

export default FAQDropdownComponent;
