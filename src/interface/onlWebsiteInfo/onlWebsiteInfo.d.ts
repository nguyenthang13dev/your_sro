import EntityType, { SearchBase } from "../general";

export default interface OnlWebsiteInfo extends EntityType {
  organizationId?: string;
  websiteTypeId?: string;
  name?: string;
  domain?: string;
  companyName?: string;
  companyTaxCode?: string;
  companyAddress?: string;
  representerName?: string;
  typeOrganization?: string;
  companyPhone?: string;
}

export interface OnlWebsiteInfoSearch extends SearchBase {
  companyName?: string;
  name?: string;
  companyTaxCode?: string;
}
