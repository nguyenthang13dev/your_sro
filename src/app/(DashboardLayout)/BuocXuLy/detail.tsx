
import React from "react";
import { Drawer } from "antd";
import { tableBuocXuLyDataType } from "@/interface/BuocXuLy/BuocXuLy";

interface BuocXuLyViewProps {
  buocXuLy?: tableBuocXuLyDataType | null;
  isOpen: boolean;
  onClose: () => void;
}

const BuocXuLyDetail: React.FC<BuocXuLyViewProps> = ({ buocXuLy, isOpen, onClose }) => {
  return (
    <Drawer
      title="Thông tin chi tiết"
      width="20%"
      placement="right"
      onClose={onClose}
      closable={true}
      open={isOpen}
    >
      <div>
        <h6 className="text-muted text-uppercase mb-3">Thông tin chung</h6>
        
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.id}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.tenBuocXuLy}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.maBuocXuLy}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.idTrangThaiBatDau}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.idTrangThaiKetThuc}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.idLuongXuLy}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isHienThiThoiGianXuLy}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isGuiEmail}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isComment}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isBuocTraVe}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isPheDuyetKetQuaKiemTraHoSo}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isPheDuyetKetQuaThamDinhHoSo}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.idKieuTraVe}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.idKieuGui}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isGuiNguoiCungPhongBan}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.idsVaiTroTiepNhan}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.idsVaiTroCC}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.idHanhDongCanThucHienTruoc}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.idHanhDongCanThucHienSau}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isCapNhatKetQuaXuLyHoSo}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.idLoaiNguoiXuLy}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.tenFileCapNhat}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isCapNhatFile}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isChonNguoiPhuTrachDichVuCong}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isGuiEmailTuChoiChoDoanhNghiep}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isTaoYeuCauBoSung}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isViewFile}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isNhapLyDoBatBuoc}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isChoPhepChinhSua}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isChoPhepXoa}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.nhanXuLy}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.capXuLy}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.nhanXuLyChinh}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{buocXuLy?.isCCTruongPhong}</span>
              </p>
      </div>
    </Drawer>
  );
};

export default BuocXuLyDetail;

