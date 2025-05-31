export interface createEditType {
  id?: string;
  name: string;
  code: string;
  giftCodeItems: string[];
  maxCountUsed: number;
  dueDate?: Date;
  description?: string;
  LevelUsed: number;
}
  

export interface tableAddItemModelDataType { 
    giftCode: string;
    charNames?: string[];
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
  countUsed: number;
  levelUsed: number;
}

export interface searchGiftCode extends SearchBase {
  name?: string;
  code?: string;
}
