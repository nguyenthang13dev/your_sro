import { SearchBase } from "../general";
export interface tableQLPage_ApiDataType {
    id?: string;
    api: string;
    method: string;
    isKhaiThac: boolean;
    isTable: boolean;
    name?: string;
    codeResponse?: string;
    isPagination?: boolean;
    isSearch?: boolean;

    isGrid?: boolean;
    html?: string;
    css?: string;

    api_params: tableApi_propertyDataType[];
    api_Responsepros: tableApi_Responsepro[];
}
export interface createEditType {
    id?: string;
    api: string;
    method: string;
    isKhaiThac: boolean;
    isTable: boolean;
    name?: string;
    codeResponse?: string;
    isPagination?: boolean;
    isSearch?: boolean;

    isGrid?: boolean;
    html?: string;
    css?: string;

    api_params: tableApi_propertyDataType[];
    api_Responsepros: tableApi_Responsepro[];
}
export interface searchQLPage_ApiDataType extends SearchBase {
    api?: string;
    method?: string;
    isKhaiThac?: boolean;
    isTable?: boolean;
    name?: string;
    isPagination?: boolean;
    isSearch?: boolean;
    api_params?: tableApi_propertyDataType[];
}
export interface tableConfigImport {
    order: number;
    columnName?: string;
    displayName?: string;
}
export interface ImportResponse {
    data?: tableQLPage_ApiDataType[];
}

export interface tableApi_propertyDataType {
    name: string;
    type: string;
    isRequired: boolean;
    isSearch: boolean;
    label?: string;
}
export interface tableApi_Responsepro {
    label: string;
    name: string;
    type: string;
    isShow: boolean;
    isDownload: boolean;
}

export interface tableApi_propertyDataType {
    name: string;
    type: string;
    isRequired: boolean;
    isSearch: boolean;
}
