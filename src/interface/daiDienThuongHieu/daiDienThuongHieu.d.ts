import EntityType, { SearchBase } from "../general";
export default interface DaiDienThuongHieu extends EntityType {
  tenDaiDien: string;
  loai: string;
  cccd?: string;
  maSoThue?: string;
  sdt?: string;
  moTa?: string;
  typeDaiGienOrSoHuu?: string;
  email?: string;
  licenseNumber?: string;
  dateIssued?: Date;
  organization?: string;
  gender?: string;
  specialization?: string;
  yearsOfExperience?: string;
  chuyenMonTxt?: string;

}

export interface DaiDienThuongHieuSearch extends SearchBase {
  tenDaiDien?: string;
  loai?: string;
  email?: string;
}
