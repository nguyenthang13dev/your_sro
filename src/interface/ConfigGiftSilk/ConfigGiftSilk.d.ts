import { SearchBase } from "../general";
export interface ConfigGiftSilkType { 
    id? : string;
    amount: number;
    giftIds: string;
    nameSet: string;
    dsItems: string;
}
export interface createEditConfigGiftSilkType {
id? : string;
amount: number;
giftIds: string;
nameSet: string;
}
export interface searchConfigGiftSilkData extends SearchBase  {
    amount?: number;
    giftIds?: string;
    nameSet?: string;
}
