import { SearchBase } from "../general";
import { UploadedItem } from "../QLPages_Banner/QLPages_Banner";

export interface tableQLMangXaHoiDataType {
  id?: string;
  name?: string | null;
  logo?: string | null;
  link?: string | null;
  description?: string | null;
  dataImage: UploadedItem;
  moHinhKiemTien?: string;
  chinhSachBaoMat?: string;
  uongDungHoTro?: string;
  phamViHoatDong?: string;
  tinhNangChinh?: string;
  nguoiSangLap?: string;
  ngayRaMat?: string;
  soLuongNguoiDung?: string;
}

export interface searchQLMangXaHoiData extends SearchBase {
  name?: string;
  link?: string;
}

export interface createEditType {
  id?: string;
  name: string;
  logoId?: string;
  link: string;
  description?: string;
  moHinhKiemTien?: string;
  chinhSachBaoMat?: string;
  uongDungHoTro?: string;
  phamViHoatDong?: string;
  tinhNangChinh?: string;
  nguoiSangLap?: string;
  ngayRaMat?: string;
  soLuongNguoiDung?: string;
}
