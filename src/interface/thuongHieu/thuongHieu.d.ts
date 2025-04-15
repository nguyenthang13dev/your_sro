import EntityType, { SearchBase } from "../general";

export default interface ThuongHieu extends EntityType {
  tenThuongHieu: string;
  moTa?: string;
  image?: string;
  slogan?: string;
  ngayThanhLap?: Date;
  daiDienId: string;
  khuVucDaiDien: string;
  ngayHetHan: Date;
  tenDaiDien: string;
  tenLinhVuc?: string;
  maLinhVuc?: string;
  clientId: number | null;
  marketRegion?: string;
  strategyDetails?: string;
}

export interface ThuongHieuSearch extends SearchBase {
  tenThuongHieu?: string;
  ngayThanhLap?: Date;
  daiDienId?: string;
  maLinhVuc?: string;
}

export interface ThuongHieuCreate extends SearchBase {
  tenThuongHieu: string;
  moTa?: string;
  image?: string;
  slogan?: string;
  ngayThanhLap?: string;
}

export interface SearchCacThuongHieuDashboard {
  nam?: number;
}
export interface SearchDiaPhuongDashboard {
  nam?: number;
}

export interface ThuongHieuDashboardDto {
  tenThuongHieu: string;
  website: number;
  sanPham: number;
}
export interface DiaPhuongDashboardDto {
  tenTinh: string;
  maTinh: string;
  website: number;
  sanPham: number;
}
