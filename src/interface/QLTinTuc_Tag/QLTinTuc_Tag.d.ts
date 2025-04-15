import { SearchBase } from "../general";

interface QLTinTuc_TagType {
    id: string;
    isShow: boolean;
    name?: string;
}
interface searchQLTinTuc_TagData extends SearchBase {
    isShow: boolean;
    name?: string;
}

interface tableQLTinTuc_TagData {
    id?: string | null;
    isShow: boolean;
    name?: string;
}
interface createEditType {
    Id?: string;
    Name?: string;
    IsShow: boolean;
}

export {
    QLTinTuc_TagType,
    searchQLTinTuc_TagData,
    tableQLTinTuc_TagData,
    createEditType,
};
