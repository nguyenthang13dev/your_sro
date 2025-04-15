import { SearchBase } from "../general";

export interface QLTinTuc_SEOType {
    id: string;
    title?: string;
    description?: string;
    note?: string;
    type?: string;
    isShow: boolean;
}

export interface createEditType {
    Id?: string;
    Title?: string;
    Description?: string;
    Note?: string;
    Type?: string;
    IsShow: boolean;
}
export interface searchDataType extends SearchBase {
    title?: string;
    description?: string;
    note?: string;
    type?: string;
    isShow?: boolean;
}
export interface tableConfigImport {
    order: number;
    columnName?: string;
    displayName?: string;
}
export interface ImportResponse {
    data?: tableDataType[];
}
