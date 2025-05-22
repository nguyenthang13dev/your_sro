import { SearchBase } from "../general";

export interface tableSilkTichNapDataType { 
    id? : string;
    rank: number;
    dsItem?: string;
    description: string;
    dsItemsName: string;
}
export interface createEditType { 
    id? : string;
    rank: number;
    dsItem: string[];
    description: string;
}
export interface tableSilkTichNapSearchType extends SearchBase { 
    pageIndex: 1;
    pageSize: 20;
}
