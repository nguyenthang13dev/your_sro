import { SearchBase } from "../general";

export interface tableQLPagesDataType {
    id: string;
    titlePage?: string;
    slug?: string;
    metaDescription?: string;
    metaTitle?: string;
    metaKeyword?: string;
    type?: string;
}

export interface createEditType {
    id?: string;
    titlePage?: string;
    slug?: string;
    metaDescription?: string;
    metaTitle?: string;
    metaKeyword?: string;
    type?: string;
}

export interface searchQLPagesDataType extends SearchBase {
    titlePage?: string;
    slug?: string;
    metaDescription?: string;
    metaTitle?: string;
    metaKeyword?: string;
    type?: string;
}

export interface tableConfigImport {
    order: number;
    columnName?: string;
    displayName?: string;
}
export interface ImportResponse {
    data?: tableQLPagesDataType[];
}

export interface tableTableDataContentDataType {
    tableHeaders: tableTableHeaderColumnDataType[];
    bodyRow: tableTableBodyRowDataType;
}

export interface tableTableHeaderColumnDataType {
    label: string;
    valueCell: string;
}

export interface tableTableBodyRowDataType {
    dataBody: any;
}
