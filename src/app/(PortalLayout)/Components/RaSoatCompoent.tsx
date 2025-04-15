"use client";

import { tableRaSoatDataType } from "@/interface/RaSoat/RaSoat";
import { raSoatService } from "@/services/RaSoat/RaSoat.service";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card } from "antd"; // Import Ant Design Card
import styles from "./RaSoatComponent.module.css"; // Keep module CSS for custom styling
import { ExclamationCircleOutlined, WarningOutlined } from "@ant-design/icons";
import DetailRaSoatComponet from "./DetailRaSoatComponet";

const RaSoatCompoent: React.FC = () => {
  const [tableRaSoat, setLstRaSoat] = useState<tableRaSoatDataType[]>([]);
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [idCanhBao, setIdCanhBao] = useState<string>("");

  const handleGetDataRaSoat = async () => {
    try {
      const response = await raSoatService.GetDataCanhBaoThacCong();
      if (response.data) {
        setLstRaSoat(response.data.items);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra trong quá trình xử lý");
    }
  };

  useEffect(() => {
    handleGetDataRaSoat();
  }, []);

  return (
    <>
      <div className={styles.warningList}>
        {tableRaSoat?.map((warning: tableRaSoatDataType) => (
          <div
            key={warning?.id}
            className={styles.warningCard}
            onClick={() => {
              setIsOpenDetail(true);
              setIdCanhBao(warning.id ?? "");
            }}
          >
            <WarningOutlined
              style={{
                color: "red",
                fontSize: "22px",
                marginRight: "15px",
              }}
            />
            <div className={styles.warningContent}>
              <h3>{warning?.tenDaiDien}</h3>
              <p>{warning?.noiDungXuLy}</p>
            </div>
          </div>
        ))}
      </div>

      <DetailRaSoatComponet
        isOpen={isOpenDetail}
        onClose={() => setIsOpenDetail(false)}
        idCanhBao={idCanhBao}
      />
    </>
  );
};

export default RaSoatCompoent;
