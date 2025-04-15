import { SearchBase } from "../general";

export interface tableDataCrawlDataType {
    id?: string;
    loai?: string;
    thoiGian?: string;
    tieuDe?: string;
    noiDung?: string;
    link?: string;
    isDaDuyet?: boolean;
    nhomTuKhoa_string?: string 
    tuKhoaSoLuong_string?: string
    noiDungHighlight?: string
    tieuDeHighlight?: string
    nhomTieuChiSoLuong_string? :string
    noiDungHighlightTieuChi?: string
    tieuDeHighlightTieuChi?: string
}
export interface createEditType {
    id?: string;
    loai?: string;
    thoiGian?: string;
    tieuDe?: string;
    noiDung?: string;
    link?: string;
    isDaDuyet?: boolean;
}
export interface searchDataCrawlDataType extends SearchBase {
    loai?: string;
    thoiGian?: string;
    tieuDe?: string;
    noiDung?: string;
    link?: string;
    isDaDuyet?: boolean;
    isTieuChi?: boolean;
}
export interface tableConfigImport {
    order: number;
    columnName?: string;
    displayName?: string;
}
export interface ImportResponse {
    data?: tableDataCrawlDataType[];
}

export interface tableDataCrawlDataTypeTrue {
    id?: string;
    loai?: string;
    thoiGian?: string;
    tieuDe?: string;
    noiDung?: string;
    link?: string;
    isDaDuyet?: boolean;
    nhomTuKhoa_string?: string 
    tuKhoaSoLuong_string?: string
    noiDungHighlight?: string
    tieuDeHighlight?: string
}