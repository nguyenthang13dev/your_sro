import { SearchBase } from "../general";
export interface linhVucThuongHieuType {
    id?: string;
    maLinhVuc?: string | null;
    tenLinhVuc?: string | null;
    moTa?: string | null;
}

export interface searchLinhVucThuongHieuData extends SearchBase {
    maLinhVuc?: string | null;
    tenLinhVuc?: string | null;
}

export interface tableLinhVucThuongHieuDataType {
    id?: string;
    maLinhVuc?: string | null;
    tenLinhVuc?: string | null;
    moTa?: string | null;
}

export interface createEditType {
    id?: string;
    maLinhVuc?: string | null;
    tenLinhVuc?: string | null;
    moTa?: string | null;

}
