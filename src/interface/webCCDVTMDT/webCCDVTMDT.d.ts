import EntityType, { SearchBase } from '../general'
import { tableRaSoatDataType } from '../RaSoat/RaSoat'

export default interface WebCCDVTMDT extends EntityType {
  tenWeb: string
  tenMienChinh: string
  tenMienKhac?: string
  logoWeb?: string
  loaiHinhDichVuCC?: string
  cacTienIch?: string
  cacTienIchKhac?: string
  loaiDichVuChuYeu?: string
  loaiDichVuChuYeuKhac?: string
  loaiPhanAnh?: string
  noiDungPhanAnh?: string
  thuongHieuId?: string
  tenToChuc?: string
  maSoThue?: string
  diaChi?: string
  nguoiDaiDien?: string
  itemId?: string
  raSoat?: tableRaSoatDataType 
}

export interface WebCCDVTMDTSearch extends SearchBase {
  tenWeb?: string
  loaiHinhDichVuCC?: string
  cacTienIch?: string
  loaiDichVuChuYeu?: string
  loaiPhanAnh?: string
  tenToChuc?: string
}

export interface WebCCDVTMDTCreate extends SearchBase {
  tenWeb: string
  tenMienChinh: string
  tenMienKhac?: string
  logoWeb?: string
  loaiHinhDichVuCC?: string
  cacTienIch?: string
  cacTienIchKhac?: string
  loaiDichVuChuYeu?: string
  loaiDichVuChuYeuKhac?: string
  loaiPhanAnh?: string
  noiDungPhanAnh?: string
  thuongHieuId?: string
  tenToChuc?: string
  maSoThue?: string
  diaChi?: string
  nguoiDaiDien?: string
  itemId?: string
}
