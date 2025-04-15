import { SearchBase } from "../general";
export interface qlTinTucType {
  id?: string;
  title: string;
  keyWord?: string;
  description?: string;
  image?: string;
  status?: string;
  isHot: boolean;
  content: string;
  taiLieuDinhKiem?: string;
  slugTitle?: string;
  loaiTin?: string;
  chuyenMucs?: string;
  note?: string;
  dsTinBai?: string;
  isComment?: boolean;
  isPublish?: boolean;
  isHome?: boolean;
  dateEnd?: Date;
  publicDate?: Date;
  dateShow?: Date;
}

export interface searchTinTucFWidDataType {
  soLuongTinBai: number;
  skip: number;
  dsChuyenMuc?: string;
  isHot?: boolean;
  isNews?: boolean;
  hasPagination?: boolean;
  hasPrint?: boolean;
  chuyenMucs?: string[];
}

export interface searchQLTinTucData extends SearchBase {
  title?: string | null;
  keyWord?: string | null;
  status?: string | null;
  isHot?: string | null;
  chuyenMucs?: string[];
}
export interface searchQLTinTucDataTimKiem extends SearchBase {
  keyWordSs: string[];
}

export interface tableQLTinTucDataType {
  id?: string;
  title: string;
  keywords?: string;
  description?: string;
  image?: string;
  status?: string;
  isHot: boolean;
  content: string;
  taiLieuDinhKiem?: string;
  slugTitle?: string;
  loaiTin?: string;
  chuyenMucs?: string;
  tags?: string;
  note?: string;
  dsTinBai?: string;
  isComment?: boolean;
  isPublish?: boolean;
  isHome?: boolean;
  dateEnd?: Date;
  publicDate?: Date;
  dateShow?: Date;
  thumbnail?: string;
  chuyenMucNames?: string[];
  tagNames?: string[];
  reactions: { like: number; comment: number };
}
export interface createEditType {
  id: string;
  title?: string;
  keyWord?: string | null;
  description?: string | null;
  image?: StringDecoder | null;
  status?: string | null;
  isHot?: boolean | null;
  publicDate?: Date | null;
  content?: string;
  taiLieuDinhKiem?: string | null;
  slugTitle?: string | null;
  fileIcon?: any;
  loaiTin?: string | null;
  fileDinhKemId: string;
  ImageId: string;
  ghichu: string | "";
  chuyenMuc: string[] | [];
  tag: string[] | [];

  tag?: string;
  isHome?: boolean;
  isComment?: boolean;
  isPheDuyet?: boolean;
  isXuatBan?: boolean;
  isTrangChu?: boolean;
}
