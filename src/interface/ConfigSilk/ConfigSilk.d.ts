
import { SearchBase } from "../general";


export interface ConfigSilkType {
    silkTotal: number;
    totalMount: number;
    silkKM: number;
    isActive?: boolean;
}
export interface tableConfigSilk {
    silkTotal: number;
    totalMount: number;
    silkKM: number;
    isActive?: boolean;
    id: string;
}
export interface createEditType {
    id? : string;
    SilkTotal: number;
    TotalMount: number;
    SilkKM: number;
    isActive?: boolean;
}
export interface searchConfigSilkDataType extends SearchBase  {
    silkTotal?: number;
    totalMount?: number;
    silkKM?: number;
    isActive?: boolean;
}
export interface tableConfigImport {
    order: number;
    columnName?: string;
    displayName?: string;
}
export interface ImportResponse {
    data?: tableDataType[];
}

