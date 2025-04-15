import EntityType, { SearchBase } from '../general'

export interface KetQuaGhiNhan extends EntityType {
  lichSuXuLyId: string
  khieuNaiPhanAnhId: string
  ketLuan: string,
  noiDung: string,
  raSoatId: string,
  idNguoiXuLy: string,
}



export default class GhiNhanKetQuaVM {
  listGhiNhan: KetQuaGhiNhan[]
  ketLuan: string
  raSoatId?: string
  idNguoiXuLy?: string
}