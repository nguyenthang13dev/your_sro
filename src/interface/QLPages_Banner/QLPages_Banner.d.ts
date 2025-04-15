import { SearchBase } from "../general";

export interface qlPages_BannerType {
  id: string;
  slidesPerView: number;
  totalSlides: number;
  autoplayDelay: number;
  effect?: string;
  loop: boolean;
  typeBanner?: string;
  navigation: boolean;
  pagination: boolean;
  dataImage?: UploadedItem[];
  code: string;
  code_txt: string;
}
export interface createEditType {
  id?: string;
  slidesPerView?: number;
  totalSlides?: number;
  autoplayDelay?: number;
  effect?: string;
  loop: boolean;
  typeBanner?: string;
  navigation: boolean;
  pagination: boolean;
  code: string;
}
export interface searchDataType extends SearchBase {
  slidesPerView?: number;
  totalSlides?: number;
  autoplayDelay?: number;
  effect?: string;
  loop?: boolean;
  navigation?: boolean;
  pagination?: boolean;
}
export interface tableConfigImport {
  order: number;
  columnName?: string;
  displayName?: string;
}
export interface ImportResponse {
  data?: tableDataType[];
}

export interface PostDataImage {
  id: string;
  dataImage?: UploadedItem[];
}

export interface UploadedItem {
  id: string;
  link?: string;
  duongDanFile: string;
}
