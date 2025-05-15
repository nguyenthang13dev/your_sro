export interface createEditType {
  id?: string;
  name: string;
  code: string;
  giftCodeItems: string[];
    maxCountUsed: number;
  dueDate?: Date;
  description?: string;
}

export interface tableGiftCode {
  id?: string;
  name: string;
  code: string;
  giftCodeItems: string;
  giftCodeItems_txt?: string;
  giftCodeItems_Data?: string[];
    maxCountUsed: number;
  dueDate?: Date;
  description?: string;
  dueDateStr?: string;
}

export interface searchGiftCode extends SearchBase {
  name?: string;
  code?: string;
}
