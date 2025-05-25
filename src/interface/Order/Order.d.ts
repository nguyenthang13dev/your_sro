import { SearchBase } from "../general";
export interface tableOrderCreateVMDataType { 
    id? : string;
    total: number;
    name: string;
    PaymentStatus?: string;
}
export interface tableOrderDataType { 
    id? : string;
    total: number;
    name: string;
    createdDate?: Date;
    createDateStr?: string;
    statusStr?: string;
    paymentStatus?: string;
    customer?: string;
}
export interface tableOrderSearchVMDataType extends SearchBase { 
    Id? : string;
    Name?: string;
}