export interface ItemType {
  key: string
  name: string
  image: string
}

export interface milestoneDataType
{
    id: string,
  price: string,
  priceValue: number,
  items: ItemType[]
}

export interface MilestoneRowProps {
  id: string,
    price: string
  items: ItemType[]
  onClaim: (price: string, id: string) => void
  claimed: boolean
  available: boolean
}

export interface AddItemModelTichNap { 
    itemTichNap: string;
    charNames: string;
    userName: string;

}
