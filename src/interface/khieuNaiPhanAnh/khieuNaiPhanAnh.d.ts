import EntityType, { SearchBase } from '../general'

export interface KhieuNaiPhanAnh extends EntityType {
  raSoatId?: string
  trangThai: string
  hoTen: string
  email: string
  ngaySinh: string
  cccd?: string
  anhCCCD?: string
  ngayCap?: string
  noiCap?: string
  diaChi: string
  sdt: string
  loai: string
  tenMien: string
  tinhCode: string
  noiDung: string
  fileDinhKem: string
  commonType: 'Website' | 'Sản phẩm'
  tenSanPham: string
  loaiSanPham: string
  tenThuongHieu: string
  createdDate: Date
  thuongHieuId: string
  nhomNganh: string
}

export default interface KhieuNaiPhanAnhView extends KhieuNaiPhanAnh {
  tenRaSoat?: string
  tenTinh?: string
  ketQua?: string
  fileDinhKem: { id: string; name: string; url: string }[]
  anhCCCD: { id: string; name: string; url: string }
  loaiPhanAnhWeb: string
  loaiPhanAnhSanPham: string
  tenNhomNganh: string
}

export interface KhieuNaiPhanAnhSearch extends SearchBase {
  tenMien?: string
  hoTen?: string
  loai?: string
  tinh?: string
  trangThai?: string
}

export interface KhieuNaiPhanAnhCreate extends EntityType {
  hoTen: string
  email: string
  ngaySinh: string
  cccd?: string
  anhCCCD?: string
  ngayCap?: string
  noiCap?: string
  diaChi: string
  sdt: string
  loai: string
  tenMien: string
  tinhCode: string
  noiDung: string
  fileDinhKem?: string
}

export interface KetQuaKhieuNai {
  id: string
  hoTen: string
  tenMien: string
  tenSanPham: string
  commonType: string
  loai: string
  ketLuanDung: Conclusion
  ketLuanSai: Conclusion
}

interface Conclusion {
  totalResult: number
  users: Participants[]
}

interface Participants {
  id: string
  name: string
}

export interface KhieuNaiDashboard {
  trangThaiPhanAnh: string
  soLuong: number
}

export interface SearchKhieuNaiDashboard {
  thoiGianBatDau?: Date | null
  thoiGianKetThuc?: Date | null
}
