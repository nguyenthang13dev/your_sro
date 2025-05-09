import { SearchBase } from "../general";

export interface tableQLNewsData {
    id? : string;
    type: string;
    title: string;
    content?: string
    published?: boolean
    publishDate?: string | null
    // content: string;
}

export interface createEditType {
id? : string;
type: string;
title: string;
    content: string;
    published?: boolean
    publishDate?: string | null
}
export interface searchQLNewsType extends SearchBase  {
type?: string;
title?: string;
}
export interface tableConfigImport {
order: number;
 columnName?: string;
 displayName?: string;
}

export interface QLNewsGroup {
    groupName: string;
    items: tableQLNewsData[];
}
  

export interface ImportResponse {
data?: tableDataType[];
}