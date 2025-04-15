import { SearchBase } from "../general";

export interface tableWebCrawlDataType {
    id?: string;
    tenTrangWeb?: string;
    url?: string;
    baseUrl?: string;
    tenVietTat?: string;
    tieuDeTinDau?: string;
    totalItem: number;
    totalPage: number;
    totalItemPerPage: number;
    classTieuDe?: string;
    classNoiDung?: string;
    soLuongTinBai?: number;
}
export interface createEditType {
    id?: string;
    tenTrangWeb?: string;
    url?: string;
    baseUrl?: string;
    tenVietTat?: string;
    tieuDeTinDau?: string;
    totalItem: number;
    totalPage: number;
    totalItemPerPage: number;
    classTieuDe?: string;
    classNoiDung?: string;
}
export interface searchWebCrawlDataType extends SearchBase {
    tenTrangWeb?: string;
    url?: string;
    baseUrl?: string;
    tenVietTat?: string;
    tieuDeTinDau?: string;
    totalItem?: number;
    totalPage?: number;
    totalItemPerPage?: number;
    classTieuDe?: string;
    classNoiDung?: string;
}
export interface tableConfigImport {
    order: number;
    columnName?: string;
    displayName?: string;
}
export interface ImportResponse {
    data?: tableWebCrawlDataType[];
}

export interface tableWebCrawlDataTypeTrue {
    id?: string;
    tenTrangWeb?: string;
    url?: string;
    baseUrl?: string;
    tenVietTat?: string;
    tieuDeTinDau?: string;
    totalItem: number;
    totalPage: number;
    totalItemPerPage: number;
    classTieuDe?: string;
    classNoiDung?: string;
}