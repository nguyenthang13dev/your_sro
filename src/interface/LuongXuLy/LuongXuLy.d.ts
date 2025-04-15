import { SearchBase } from "../general";

export interface tableLuongXuLyDataType {
    id?: string;
    tenLuongXuLy: string;
}
export interface createEditType {
    id?: string;
    tenLuongXuLy: string;
}
export interface searchLuongXuLyData extends SearchBase {
    tenLuongXuLy?: string;
}
export interface tableConfigImport {
    order: number;
    columnName?: string;
    displayName?: string;
}
export interface ImportResponse {
    data?: tableLuongXuLyDataType[];
}
export interface tableLuongXuLyDataTypeTrue {
    id?: string;
    tenLuongXuLy: string;
}

export interface dropdownLuongRaSoat {
    name: string;
    id: string;
}

export interface nutVM {
    idRaSoat: string;
    idNguoiNhan: string;
}

export interface nutLuongXuLy {
    tenBuocXuLy?: string;
    idBuoc: string;
    idLuongXuLy?: string;
    maBuocXuLy?: string;
    tenBuocSeLam?: string;
    isBuocTraVe? : boolean;
    isGhiNhanKetQua?: boolean;
    isKetThuc?: boolean;
}

export interface dataSendFormVM {
    idLuong: string;
    idRaSoat: string;
    idNguoiXuLy: string;
}

export interface detailDataSendFormVM {
    idBuoc: string | null;
    idRaSoat: string;
    idNguoiXuLy: string;
}