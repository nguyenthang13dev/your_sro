import { SearchBase } from "../general";

interface tableQLTinTuc_Widget {
  id: string;
  soLuongTinBai: number;
  content?: gridItemDataType[];
  typeWidgets?: string;
  listTinTuc?: string;
  isPublish: boolean;
  isHot: boolean;
  isNews: boolean;
  code: string;
  typePreview?: string;
  colNumber?: number;
  dsChuyenMuc: string[];
  typePreviewCode?: string;
  codeCompoent?: string;
  dsChuyenMuctxt: string[];
  hasPagination: boolean;
  hasPrint: boolean;
  skip: number;
}

interface createEditType {
  SoLuongTinBai: numer;
  IsHot: boolean;
  IsNews: boolean;
  Content: gridItemDataType[];
  ListTinTuc: string;
  IsPublish: boolean;
  Code: string;
  Id?: string;
  typePreview?: string;
  colNumber?: number;
  dsChuyenMuc: string[];
}

interface tableQLTInTuc_WidgetPreVMDataType {
  configId: string;
  dsTinTuc: string[];
}

interface gridItemDataType {
  i: string; // ID của item
  x: number; // Vị trí cột
  y: number; // Vị trí hàng
  w: number; // Chiều rộng
  h: number; // Chiều cao
  moved?: boolean; // Có di chuyển không?
  isDraggable?: boolean;
  isResizable?: boolean;
  isBounded?: boolean;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  ThuTuHienThi?: number;
}

interface gridItemInfor {
  title?: string;
  image?: string;
  slug?: string;
  description?: string;
}
interface gridItemDataTypeWdget {
  infor: gridItemInfor;
  item: gridItemDataType;
}

interface dsItemDataWidget {
  dsContent: gridItemDataTypeWdget[];
  id?: string;
}

interface searchQLTinTuc_Widget extends SearchBase {
  name?: string;
  typeWidgets?: string;
  isPublish: boolean;
}

interface searchQLTinTuc_WidgetTB {
  soLuongTinBai: number;
  isHot?: boolean;
  isPublish?: boolean;
  dsChuyenMuc?: string;
  isNews?: boolean;
  Id?: string;
}

interface QLTinTucWidgetDto {
  title?: string;
  keyWord?: string;
  description?: string;
  image?: string;
  status?: string;
  isHot?: boolean;
  publicDate?: Date;
  content?: string;
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
  dateShow?: Date;
  id: string;
  typePreview?: string;
  colNumber?: number;
}

export {
  searchQLTinTuc_Widget,
  tableQLTinTuc_Widget,
  gridItemDataType,
  createEditType,
  searchQLTinTuc_WidgetTB,
  QLTinTucWidgetDto,
  dsItemDataWidget,
  tableQLTInTuc_WidgetPreVMDataType,
};
