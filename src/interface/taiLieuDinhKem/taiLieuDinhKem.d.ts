import EntityType from "../general";

export interface TaiLieuDinhKem extends EntityType {
    tenTaiLieu: string;
    dinhDangFile: string;
    duongDanFile: string;
    loaiTaiLieu: string;
    ngayPhatHanh: Date;
    kichThuoc: number;
    isKySo: Nullable<boolean>;
    keyTieuChiKeKhai: string;
    nguoiKy: string;
    donViPhatHanh: string;
    ngayKy: string;
}