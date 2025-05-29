import { SearchBase } from "../general";

export interface tableWebShopDataType { 
    id? : string;
    nameSet: string;
    dsItems: string;
    giaTien: number;
    giftCodeItems_txt: string;
}

export interface webShopCreateVMDataType { 
    id? : string;
    nameSet: string;
    giftCodeItems: string[];
    giaTien: number;
}

export interface searchWebShopSearchVM extends SearchBase
{
    pageIndex: number,
    pageSize: number;
    
}