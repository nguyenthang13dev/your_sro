import EntityType, { SearchBase } from '../general'

export default interface RaSoatTieuChi extends EntityType {
  nhomTieuChi?: string
  danhSachTieuChi?: string
  soLuongTuKhoa?: int
}

export interface RaSoatTieuChiSearch extends SearchBase {
  nhomTieuChi?: string
}

export interface RaSoatTieuChiCreate extends EntityType {
  nhomTieuChi?: string
  danhSachTieuChi?: string
}