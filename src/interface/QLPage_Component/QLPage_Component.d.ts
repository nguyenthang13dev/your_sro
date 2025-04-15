import { SearchBase } from "../general";
export interface tableQLPage_ComponentDataType {
  id?: string;
  code?: string;
  type?: string;
  api?: string;
  elements?: string;
  nameType?: string;
  html?: string;
  css?: string;
  image: string;
  dataImage: UploadedItem;
}
export interface createEditType {
  id?: string;
  code?: string;
  type?: string;
  api?: string;
  elements?: string;
  imageId?: string;
}
export interface searchQLPage_ComponentDataType extends SearchBase {
  code?: string;
  type?: string;
  api?: string;
  elements?: string;
}
export interface tableConfigImport {
  order: number;
  columnName?: string;
  displayName?: string;
}
export interface ImportResponse {
  data?: tableQLPage_ComponentDataType[];
}

export interface tableQLPage_ComponentDataTypeTrue {
  id?: string;
  code?: string;
  type?: string;
  api?: string;
  elements?: string;
  nameType?: string;
}
