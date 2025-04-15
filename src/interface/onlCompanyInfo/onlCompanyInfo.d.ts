import EntityType, { SearchBase } from '../general'

export default interface OnlCompanyInfo extends EntityType {
  name?: string
  englishName?: string
  shortName?: string
  taxCode?: string
  address?: string
  companyTypeName?: string
  email?: string
  representerName?: string
}

export interface OnlCompanyInfoSearch extends SearchBase {
  name?: string
}