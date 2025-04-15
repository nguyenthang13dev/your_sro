import { SearchBase } from "../general";
export interface tableBuocXuLyDataType {
  id?: string;
  tenBuocXuLy: string;
  maBuocXuLy: string;
  idTrangThaiBatDau?: string;
  idTrangThaiKetThuc?: string;
  idLuongXuLy?: string;
  isHienThiThoiGianXuLy?: boolean;
  isGuiEmail?: boolean;
  isComment?: boolean;
  isBuocTraVe?: boolean;
  isPheDuyetKetQuaKiemTraHoSo: boolean;
  isPheDuyetKetQuaThamDinhHoSo: boolean;
  idKieuTraVe?: number;
  idKieuGui?: number;
  isGuiNguoiCungPhongBan?: boolean;
  idsVaiTroTiepNhan: string;
  idsVaiTroCC: string;
  idHanhDongCanThucHienTruoc?: number;
  idHanhDongCanThucHienSau?: number;
  isCapNhatKetQuaXuLyHoSo?: boolean;
  idLoaiNguoiXuLy?: number; //phân biệt bước do người dùng trên hệ thống hay người dân tạo ra
  tenFileCapNhat: string; //nhãn tiêu đề khi cập nhật file
  isCapNhatFile?: boolean;
  isChonNguoiPhuTrachDichVuCong?: boolean;
  isGuiEmailTuChoiChoDoanhNghiep?: boolean;
  isTaoYeuCauBoSung?: boolean; //tạo yêu cầu bổ sung cho doanh nghiệp
  isViewFile?: boolean; //hiển thị mẫu giấy phép cho người dùng
  isNhapLyDoBatBuoc?: boolean; //bắt buộc nhập lý do trả về
  isChoPhepChinhSua?: boolean;
  isChoPhepXoa?: boolean;
  nhanXuLy: string;
  capXuLy: string;
  nhanXuLyChinh: string;
  isCCTruongPhong?: boolean;
  trangThaiBatDau_txt?: string;
  trangThaiKetThuc_txt?: string;
  vaiTroTiepNhan_txt?: string[];
  vaiTroTiepNhan_respone?: string;
  vaiTroCC_txt?: string[];
  vaiTroCC_respone?: string[];
}
export interface createEditType {
  id?: string;
  tenBuocXuLy: string;
  maBuocXuLy: string;
  idTrangThaiBatDau?: string;
  idTrangThaiKetThuc?: string;
  idLuongXuLy?: string;
  isHienThiThoiGianXuLy?: boolean;
  isGuiEmail?: boolean;
  isComment?: boolean;
  isBuocTraVe?: boolean;
  isPheDuyetKetQuaKiemTraHoSo: boolean;
  isPheDuyetKetQuaThamDinhHoSo: boolean;
  idKieuTraVe?: number;
  idKieuGui?: number;
  isGuiNguoiCungPhongBan?: boolean;
  idsVaiTroTiepNhan?: string;
  idsVaiTroCC?: string[];
  idHanhDongCanThucHienTruoc?: number;
  idHanhDongCanThucHienSau?: number;
  isCapNhatKetQuaXuLyHoSo?: boolean;
  idLoaiNguoiXuLy?: number; //phân biệt bước do người dùng trên hệ thống hay người dân tạo ra
  tenFileCapNhat: string; //nhãn tiêu đề khi cập nhật file
  isCapNhatFile?: boolean;
  isChonNguoiPhuTrachDichVuCong?: boolean;
  isGuiEmailTuChoiChoDoanhNghiep?: boolean;
  isTaoYeuCauBoSung?: boolean; //tạo yêu cầu bổ sung cho doanh nghiệp
  isViewFile?: boolean; //hiển thị mẫu giấy phép cho người dùng
  isNhapLyDoBatBuoc?: boolean; //bắt buộc nhập lý do trả về
  isChoPhepChinhSua?: boolean;
  isChoPhepXoa?: boolean;
  nhanXuLy: string;
  capXuLy: string;
  nhanXuLyChinh: string;
  isCCTruongPhong?: boolean;
}
export interface searchBuocXuLyDataType extends SearchBase {
  tenBuocXuLy?: string;
  maBuocXuLy?: string;
  idTrangThaiBatDau?: string;
  idTrangThaiKetThuc?: string;
  idLuongXuLy?: string;
  isHienThiThoiGianXuLy?: boolean;
  isGuiEmail?: boolean;
  isComment?: boolean;
  isBuocTraVe?: boolean;
  isPheDuyetKetQuaKiemTraHoSo?: boolean;
  isPheDuyetKetQuaThamDinhHoSo?: boolean;
  idKieuTraVe?: number;
  idKieuGui?: number;
  isGuiNguoiCungPhongBan?: boolean;
  idsVaiTroTiepNhan?: string;
  idsVaiTroCC?: string;
  idHanhDongCanThucHienTruoc?: number;
  idHanhDongCanThucHienSau?: number;
  isCapNhatKetQuaXuLyHoSo?: boolean;
  idLoaiNguoiXuLy?: number; //phân biệt bước do người dùng trên hệ thống hay người dân tạo ra
  tenFileCapNhat?: string; //nhãn tiêu đề khi cập nhật file
  isCapNhatFile?: boolean;
  isChonNguoiPhuTrachDichVuCong?: boolean;
  isGuiEmailTuChoiChoDoanhNghiep?: boolean;
  isTaoYeuCauBoSung?: boolean; //tạo yêu cầu bổ sung cho doanh nghiệp
  isViewFile?: boolean; //hiển thị mẫu giấy phép cho người dùng
  isNhapLyDoBatBuoc?: boolean; //bắt buộc nhập lý do trả về
  isChoPhepChinhSua?: boolean;
  isChoPhepXoa?: boolean;
  nhanXuLy?: string;
  capXuLy?: string;
  nhanXuLyChinh?: string;
  isCCTruongPhong?: boolean;
}
export interface tableConfigImport {
  order: number;
  columnName?: string;
  displayName?: string;
}
export interface ImportResponse {
  data?: tableBuocXuLyDataType[];
}
export interface tableBuocXuLyDataTypeTrue {
  id?: string;
  tenBuocXuLy: string;
  maBuocXuLy: string;
  idTrangThaiBatDau?: string;
  idTrangThaiKetThuc?: string;
  idLuongXuLy?: string;
  isHienThiThoiGianXuLy?: boolean;
  isGuiEmail?: boolean;
  isComment?: boolean;
  isBuocTraVe?: boolean;
  isPheDuyetKetQuaKiemTraHoSo: boolean;
  isPheDuyetKetQuaThamDinhHoSo: boolean;
  idKieuTraVe?: number;
  idKieuGui?: number;
  isGuiNguoiCungPhongBan?: boolean;
  idsVaiTroTiepNhan: string;
  idsVaiTroCC: string;
  idHanhDongCanThucHienTruoc?: number;
  idHanhDongCanThucHienSau?: number;
  isCapNhatKetQuaXuLyHoSo?: boolean;
  idLoaiNguoiXuLy?: number; //phân biệt bước do người dùng trên hệ thống hay người dân tạo ra
  tenFileCapNhat: string; //nhãn tiêu đề khi cập nhật file
  isCapNhatFile?: boolean;
  isChonNguoiPhuTrachDichVuCong?: boolean;
  isGuiEmailTuChoiChoDoanhNghiep?: boolean;
  isTaoYeuCauBoSung?: boolean; //tạo yêu cầu bổ sung cho doanh nghiệp
  isViewFile?: boolean; //hiển thị mẫu giấy phép cho người dùng
  isNhapLyDoBatBuoc?: boolean; //bắt buộc nhập lý do trả về
  isChoPhepChinhSua?: boolean;
  isChoPhepXoa?: boolean;
  nhanXuLy: string;
  capXuLy: string;
  nhanXuLyChinh: string;
  isCCTruongPhong?: boolean;
}
