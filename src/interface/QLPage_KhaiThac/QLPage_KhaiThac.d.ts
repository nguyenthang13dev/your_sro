import { SearchBase } from "../general";
export interface tableQLPage_KhaiThacDataType {
    id?: string;
    api?: string;
    name?: string;
    code?: string;
}
export interface createEditType {
    id?: string;
    api?: string;
    name?: string;
    code?: string;
}
export interface searchQLPage_KhaiThacDataType extends SearchBase {
    api?: string;
    name?: string;
    code?: string;
}
export interface tableConfigImport {
    order: number;
    columnName?: string;
    displayName?: string;
}
export interface ImportResponse {
    data?: tableQLPage_KhaiThacDataType[];
}
