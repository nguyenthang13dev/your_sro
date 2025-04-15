import { SearchBase } from "../general";

export interface tableQLTinTuc_CommentDataType {
  id?: string;
  id_TinTuc: string;
  comment?: string;
  isHidden: boolean;
}
export interface createEditType {
  id?: string;
  id_TinTuc: string;
  comment?: string;
  isHidden: boolean;
}
export interface searchQLTinTuc_CommentDataType extends SearchBase {
  id_TinTuc?: string;
  comment?: string;
  isHidden?: boolean;
}
export interface tableConfigImport {
  order: number;
  columnName?: string;
  displayName?: string;
}
export interface ImportResponse {
  data?: tableQLTinTuc_CommentDataType[];
}
export interface tableQLTinTuc_CommentDataTypeTrue {
  id?: string;
  id_TinTuc: string;
  comment?: string;
  isHidden: boolean;
}