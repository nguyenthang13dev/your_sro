import { SearchBase } from "../general";

export interface tableTrangThaiLuongXuLyDataType {
    id?: string;
    tenTrangThaiXuLy: string;
    maTrangThaiXuLy: string;
    idLuongXuLy?: string;
    isBatDau?: boolean;
    isKetThuc?: boolean;
    location: string;
    idHanhDong?: number;
    functionCode: string;
    isTiepNhanTuNguoiDan?: boolean;//xem trạng thái nào là được tiếp nhận từ người dân
    isDoanhNghiepCapNhatPhiThamDinh: boolean;
    isDoanhNghiepCapNhatBoSungHoSo: boolean;
    isChoPhepCapNhatCongVan: boolean;
    moTa: string;
    idNhomTrangThai?: string;
}
export interface createEditType {
    id?: string;
    tenTrangThaiXuLy: string;
    maTrangThaiXuLy: string;
    idLuongXuLy?: string;
    isBatDau?: boolean;
    isKetThuc?: boolean;
    location: string;
    idHanhDong?: number;
    functionCode: string;
    isTiepNhanTuNguoiDan?: boolean;//xem trạng thái nào là được tiếp nhận từ người dân
    isDoanhNghiepCapNhatPhiThamDinh: boolean;
    isDoanhNghiepCapNhatBoSungHoSo: boolean;
    isChoPhepCapNhatCongVan: boolean;
    moTa: string;
    idNhomTrangThai?: string;
}
export interface searchTrangThaiLuongXuLyData extends SearchBase {
    tenTrangThaiXuLy?: string;
    maTrangThaiXuLy?: string;
    idLuongXuLy?: string;
    isBatDau?: boolean;
    isKetThuc?: boolean;
    location?: string;
    idHanhDong?: number;
    functionCode?: string;
    isTiepNhanTuNguoiDan?: boolean;//xem trạng thái nào là được tiếp nhận từ người dân
    isDoanhNghiepCapNhatPhiThamDinh?: boolean;
    isDoanhNghiepCapNhatBoSungHoSo?: boolean;
    isChoPhepCapNhatCongVan?: boolean;
    moTa?: string;
    idNhomTrangThai?: string;
}
export interface tableConfigImport {
    order: number;
    columnName?: string;
    displayName?: string;
}
export interface ImportResponse {
    data?: tableTrangThaiLuongXuLyDataType[];
}

export interface tableTrangThaiLuongXuLyDataTypeTrue { 
    id?: string;
    tenTrangThaiXuLy: string;
    maTrangThaiXuLy: string;
    idLuongXuLy?: string;
    isBatDau?: boolean;
    isKetThuc?: boolean;
    location: string;
    idHanhDong?: number;
    functionCode: string;
    isTiepNhanTuNguoiDan?: boolean;//xem trạng thái nào là được tiếp nhận từ người dân
    isDoanhNghiepCapNhatPhiThamDinh: boolean;
    isDoanhNghiepCapNhatBoSungHoSo: boolean;
    isChoPhepCapNhatCongVan: boolean;
    moTa: string;
    idNhomTrangThai?: string;
}