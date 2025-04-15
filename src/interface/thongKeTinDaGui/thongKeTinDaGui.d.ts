import EntityType, { SearchBase } from '../general'

export default interface ThongKeTinDaGui extends EntityType {
  tieuDe?: string
  nguoiTao?: string
  loaiThongBao?: string
  noiDung?: string
  itemId?: string
  createdDate?: Date
  nguoiNhan?: string
}

export interface ThongKeTinDaGuiSearch extends SearchBase {
  tieuDe?: string
}

export interface ThongKeTinDaGuiCreate extends EntityType {
  tieuDe?: string
  nguoiTao?: string
  loaiThongBao?: string
  noiDung?: string
  itemId?: string
}