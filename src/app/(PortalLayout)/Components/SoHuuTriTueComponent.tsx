"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./SoHuu.module.css"; // Keep module CSS for custom styling
import DaiDienThuongHieu, {
  DaiDienThuongHieuSearch,
} from "@/interface/daiDienThuongHieu/daiDienThuongHieu";
import { daiDienThuongHieuService } from "@/services/daiDienThuongHieu/daiDienThuongHieu.service";
import DetailSoHuuTriTueComponet from "./DetailSoHuuTriTueComponet";

const SoHuuTriTueCompoent: React.FC = () => {
  const [tableDaiDien, setListDaiDienThuongHieu] = useState<
    DaiDienThuongHieu[]
  >([]);
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const [pagination, setPagination] = useState<DaiDienThuongHieuSearch>({
    pageIndex: 1,
    pageSize: 5,
  });
  const handleGetDataRaSoat = async () => {
    try {
      const response = await daiDienThuongHieuService.getDataByPage(pagination);

      if (response.data) {
        setListDaiDienThuongHieu(response?.data?.items);
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
      <div className={styles.soHuuList}>
        {tableDaiDien?.map((soHuu: DaiDienThuongHieu) => (
          <div
            key={soHuu?.id}
            className={styles.shCard}
            onClick={() => {
              setIsOpenDetail(true);
              setId(soHuu.id ?? "");
            }}
          >
            <div className={styles.shContent}>
              <h3>
                {soHuu?.tenDaiDien} - {soHuu?.maSoThue}
              </h3>
              <p>{soHuu?.moTa}</p>
            </div>
          </div>
        ))}
      </div>
      <DetailSoHuuTriTueComponet
        id={id}
        isOpen={isOpenDetail}
        onClose={() => {
          setIsOpenDetail(false);
        }}
      />
    </>
  );
};

export default SoHuuTriTueCompoent;
