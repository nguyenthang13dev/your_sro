import { SearchBase } from "../general";


export interface tableOrderVpDataType { 
    id? : string;
    idWebShop: string;
    total: number;
    name: string;
    paymentStatus: string;
}

export interface createOrEdit {
    idWebShop: string;
    total: number;
    name: string;
    paymentStatus: string;
    id: string;
}

export interface tableOrderVpSearchVMDataType extends SearchBase { 
    Id? : string;
    name?: string;
}