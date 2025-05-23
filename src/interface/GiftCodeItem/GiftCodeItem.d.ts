export interface createEditType {
  id?: string;
  codeItem: string;
  nameItem: string;
  quanlity: number;
}

export interface tableGiftCodeItem {
  id?: string;
  codeItem: string;
  nameItem: string;
  quanlity: number;
  icon?: string;
}

export interface searchGiftCodeItem extends SearchBase {
  nameItem?: string;
  codeItem?: string;
}
