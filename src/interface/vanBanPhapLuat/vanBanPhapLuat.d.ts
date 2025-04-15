import { SearchBase } from "../general";

interface vanBanPhapLuatType {
  SoHieu: string;
  TenVanBan: string;
  DonViBanHanh: string;
  NgayBanHanh: Date;
  TaiLieuDinhKem: string;
}

interface searchVanBanPhapLuatDataType extends SearchBase {
  SoHieu?: string | "";
  TenVanBan?: string | "";
  DonViBanHanh?: string | "";
  NgayBatDau?: Date;
  NgayKetThuc?: Date;
  Code?: string | "";
}

interface tableVanBanPhapLuatDataType {
  id: string;
  soHieu: string;
  tenVanBan: string;
  donViBanHanh: string;
  ngayBanHanh: Date;
  taiLieuDinhKemUrl: string;
  ngayBanHanhStr: string;
  pathFile: string;
  fileName: string;
  taiLieuDinhKem: string;
  loaiVanBan: string;
  ngayCoHieuLuc: Date;
  ngayHetHan: Date;
  nguoiKy: string;
  trangThai: string;
  trangThaiTxt: string;
  trichDan: string;
  noiDung: string;
  loaiHeThong: string;
}

interface createEditVanBanPhapLuatType {
  soHieu: string;
  tenVanBan: string;
  donViBanHanh: string;
  ngayBanHanh: Date;
  taiLieuDinhKem: string;
  loaiVanBan: string;
  nguoiKy: string;
  ngayCoHieuLuc: Date;
  ngayHetHan: Date;
  trangThai: string;
  loaiHeThong: string;
  trichDan: string;
  noiDung: string;
  id?: string;
}

interface SastifyLawDto {
  label: string;
  type: string;
  value: string;
}

export {
  vanBanPhapLuatType,
  searchVanBanPhapLuatDataType,
  createEditVanBanPhapLuatType,
  tableVanBanPhapLuatDataType,
  SastifyLawDto,
};
