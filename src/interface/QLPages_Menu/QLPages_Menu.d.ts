import { SearchBase } from '../general'

export interface tableQLPages_MenuDataType {
  id?: string
  keySlug?: string
  slug?: string
  api?: string
  title?: string
  paramsApi?: string
  parentId?: string
  page?: string
  htmlCode?: string
  cssCode?: string
  code: string
  isRoot: boolean
  children: tableQLPages_MenuDataType[]
}
export interface createEditType {
  id?: string
  keySlug?: string
  slug?: string
  api?: string
  title?: string
  paramsApi?: string
  parentId?: string
  htmlCode?: string
  cssCode?: string
}
export interface searchQLPages_MenuDataType extends SearchBase {
  keySlug?: string
  slug?: string
  api?: string
  title?: string
  paramsApi?: string
}
export interface tableConfigImport {
  order: number
  columnName?: string
  displayName?: string
}
export interface ImportResponse {
  data?: tableQLPages_MenuDataType[]
}
