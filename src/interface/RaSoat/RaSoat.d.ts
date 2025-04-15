import { SearchBase } from '../general'

export interface tableRaSoatDataType {
  id?: string
  tenRaSoat: string
  tenWebsite: string
  tenDaiDien: string
  maSoThue: string
  diaChiDN: string
  sdtDN: string
  emailDN: string
  tinhCode: string
  trangThai: string
  ketQua: string
  createdDate: Date
  createdBy: string
  lichSuXuLy: History[]
  khieuNaiPhanAnh: Complaint[]
  tenSanPham: string
  itemId: string
  commonType: string
  createdId: string
  lichSuGanNhatVaiTro: string[]
  idLuongXuLy: string
  loaiWebsite: string
  tieuDe: string
  thoiGian: Date
  nguoiXuLyName: string
  listNut: nutLuongXuLy[]
  tenLuongXuLy: string
  noiDungXuLy: string
}
export interface createEditType {
  id?: string
  tenRaSoat: string
  tenWebsite: string
  tenDaiDien: string
  maSoThue: string
  diaChiDN: string
  sdtDN: string
  emailDN: string
  tinhCode: string
  trangThai: string
  ketQua: string
  idLuongXuLy: string
  itemId: string
  commonType: string
}
export interface searchRaSoatData extends SearchBase {
  tenRaSoat?: string
  tenWebsite?: string
  tenDaiDien?: string
  maSoThue?: string
  diaChiDN?: string
  sdtDN?: string
  emailDN?: string
  tinhCode?: string
  trangThai?: string
  startDate?: string
  endDate?: string
  ketQua?: string
}
export interface tableConfigImport {
  order: number
  columnName?: string
  displayName?: string
}
export interface ImportResponse {
  data?: tableRaSoatDataType[]
}

export interface tableRaSoatDataTypeTrue {
  id?: string
  tenRaSoat: string
  tenWebsite: string
  tenDaiDien: string
  maSoThue: string
  diaChiDN: string
  sdtDN: string
  emailDN: string
  tinhCode: string
  trangThai: string
  ketQua: string
}
export interface History {
  id: string
  nguoiXuLyId: string
  tenNguoiXuLy: string
  isCurrent: boolean
  createdId: string
}
export interface Complaint {
  id: string
  raSoatId: string
  hoTen: string
  ngaySinh: string
  sdt: string
  email: string
  cccd: string
  loai: string
  websiteId: number
  tenMien: string
  noiDung: string
  fileDinhKem?: string
}

export interface ketLuanVM {
  raSoatId?: string
  noiDungXuLy: string
  nguoiXuLyId: string
  idBuocXuLy: string
  tieuDe: string
}
