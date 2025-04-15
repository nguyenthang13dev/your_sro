import EntityType, { SearchBase } from "../general";
import { tableRaSoatDataType } from "../RaSoat/RaSoat";

export interface tableWebTMDTBanHang extends EntityType {
  id?: string;
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
  logo?: string;
  thuongHieuId?: string;
  isPhanAnh?: boolean;
  dataImage: UploadedItem;
  raSoat?: tableRaSoatDataType
}

export interface searchWebTMDTBanHang extends SearchBase {
  name?: string;
  companyName?: string;
}

export interface createEditType {
  id?: string;
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
  logo?: string;
  thuongHieuId?: string;
  isPhanAnh?: boolean;
}
