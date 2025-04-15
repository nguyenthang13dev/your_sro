import { SearchBase } from "../general";
import { gridItemDataType } from "../QLTinTuc_Widget/QLTinTuc_Widget";

export interface tableQLTinTuc_CauHinhDataType {
    id?: string;
    content?: gridItemDataType[];
    type?: string;
    isImage: boolean;
    isDateTime: boolean;
    isTitle: boolean;
    isDescription: boolean;
    html?: string;
    css?: string;
}
export interface createEditType {
    id?: string;
    content?: gridItemDataType[];
    type?: string;
    isImage: boolean;
    isDateTime: boolean;
    isTitle: boolean;
    isDescription: boolean;
    html?: string;
    css?: string;
}
export interface searchQLTinTuc_CauHinhDataType extends SearchBase {
    content?: string;
    type?: string;
    isImage?: boolean;
    isDateTime?: boolean;
    isTitle?: boolean;
    isDescription?: boolean;
}

// export interface tableQLTinTuc_CauHinhDataTypeTrue {

// }

export interface tableConfigImport {
    order: number;
    columnName?: string;
    displayName?: string;
}
export interface ImportResponse {
    data?: tableQLTinTuc_CauHinhDataType[];
}
