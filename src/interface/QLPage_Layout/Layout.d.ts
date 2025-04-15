import EntityType, { SearchBase } from '../general'
export interface Layout extends EntityType {
  name: string
  html: string
  css: string
}
