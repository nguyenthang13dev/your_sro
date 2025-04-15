import EntityType, { SearchBase } from "../general";

export default interface SanPham extends EntityType {
  tenSP: string;
  thuongHieuId: string;
  loaiSanPham: string;
  gia?: number;
  moTa?: string;
  image?: string;
  linkSanPham: string;
  idChuSoHuu: number;
}

export interface SanPhamView extends SanPham {
  tenThuongHieu: string;
  tenChuSoHuu: string;
  tenLoaiSanPham: string;
  idsTuKhoa: string[];
  tuKhoa_response: string[];
  image: { id: string; name: string; url: string }[];
  dsTuKhoa: string[];
}

export interface SanPhamSearch extends SearchBase {
  tenSP?: string;
  loaiSanPham?: Date;
  thuongHieuId?: string;
}
export interface CacSanPhamViPhamDashboard {
  nhom: string;
  soLuong: number;
}
export interface SearchCacSanPhamViPhamboard {
  nam?: numbe;
}

export interface SearchImage extends SearchBase {
  listIdImageSearch: string[];
}

export interface ImageData {
  image: string;
  link: string;
  idSanPham: string;
}
