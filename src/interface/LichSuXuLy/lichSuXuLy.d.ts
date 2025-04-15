import EntityType from "../general";

export default interface LichSuXuLy extends EntityType {
  raSoatId: string;
  nguoiXuLyId?: string;
  nguoiNhanId?: string;
  hanXuLy?: string;
  nguoiThamGiaXuLyIds?: string;
  fileDinhKem?: string;
  tieuDe?: string;
  noiDung?: string;
  isCurrent: boolean;
  idLuongXuLy?: string;
  isReturn: boolean;
}

export interface ProcessHistory {
  id: string;
  raSoatId: string;
  nguoiXuLyId: string;
  nguoiXuLy: ProcessUserInfo;
  nguoiThamGiaXuLyIds?: string;
  nguoiThamGiaXuLy: ProcessUserInfo[];
  tieuDe: string;
  noiDung?: string;
  fileDinhKem?: string;
  createdDate: Date;
  ketQuaXuLy: string;
  nguoiNhan: ProcessUserInfo;
}

export interface ProcessUserInfo {
  name: string;
  picture: string;
}

export interface PhanAnhTheoDonViChuTriDashboard {
  chuTri: string
  soLuong: number
}
export interface SearchPhanAnhTheoDonViChuTriboard {
  nam?: number
}
