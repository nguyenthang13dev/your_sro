export interface tableOrderCreateVMDataType { 
    id? : string;
    total: number;
    name: string;
    PaymentStatus?: string;
}
export interface tableOrderSearchVMDataType extends SearchBase { 
    id? : string;
    name: string;
}