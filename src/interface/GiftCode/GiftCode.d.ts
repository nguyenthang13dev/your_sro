export interface createEditType {
  id?: string;
  name: string;
  code: string;
  giftCodeItems: string[];
}

export interface tableGiftCode {
  id?: string;
  name: string;
  code: string;
  giftCodeItems: string;
  giftCodeItems_txt?: string;
  giftCodeItems_Data?: string[];
}

export interface searchGiftCode extends SearchBase {
  name?: string;
  code?: string;
}
