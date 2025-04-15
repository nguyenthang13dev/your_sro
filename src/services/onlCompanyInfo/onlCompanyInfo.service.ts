import { apiService } from '../index'
import { DropdownOptionAntd, Response } from '@/interface/general'
import {
  OnlCompanyInfoSearch,
} from '@/interface/onlCompanyInfo/onlCompanyInfo'

class OnlCompanyInfoService {
  public async getDataByPage(searchData: OnlCompanyInfoSearch): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/OnlCompanyInfo/GetData',
        searchData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getDataDoanhNghiepViPham(): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/OnlCompanyInfo/GetDataDoanhNghiepViPham'
      )
      return response.data
    } catch (error) {
      throw error
    }
  }


  public async GetDropdownCompany(): Promise<Response<DropdownOptionAntd[]>> {
    try {
        const response = await apiService.get<Response<DropdownOptionAntd[]>>(
            "/OnlCompanyInfo/GetDropdownCompany" 
        );
        return response.data;
    } catch (error) {
        throw error;
    }
  }

  public async getDropdownOrganization(): Promise<Response<DropdownOptionAntd[]>> {
    try {
        const response = await apiService.get<Response<DropdownOptionAntd[]>>(
            "/OnlCompanyInfo/GetDropdownOrganization" 
        );
        return response.data;
    } catch (error) {
        throw error;
    }
  }
}

export const onlCompanyInfoService = new OnlCompanyInfoService()
