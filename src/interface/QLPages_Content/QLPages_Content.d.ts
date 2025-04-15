import { SearchBase } from "../general";
import { qlPages_BannerType } from "../QLPages_Banner/QLPages_Banner";

export interface tableDataType {
    components: string;
    id: string;
    idPage: string;
    isTrangChu: boolean;
    style: string;
    html: string;
}
export interface createEditType {
    Id?: string;
    Components?: string;
    Style?: string;
    Html: string;
    IsTrangChu: boolean;
}

export interface tableQLPages_ContentDataType {
    id?: string;
    idPage?: string;
    duongDanPage?: string;
    components?: string;
    html?: string;
    style?: string;
    isTrangChu: boolean;
}

export interface searchDataType extends SearchBase {
    components?: string;
    style?: string;
}

export interface ImportResponse {
    data?: tableDataType[];
}

export interface tableApiResponseCallDataType {
    api: string;
    params: undefined;
    keyElement: string;
    meThod: string;
}
export interface pageListItemDataType {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
    api?: string;
    paramsApi?: string;
    method: string;
    keyElement: string;
}
