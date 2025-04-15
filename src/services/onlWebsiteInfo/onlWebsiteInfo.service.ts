import { apiService } from '../index'
import { DropdownOptionAntd, Response } from '@/interface/general'
import { OnlWebsiteInfoSearch } from '@/interface/onlWebsiteInfo/onlWebsiteInfo'

class OnlWebsiteInfoService {
  public async getDataByPage(
    searchData: OnlWebsiteInfoSearch
  ): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/OnlWebsiteInfo/GetData',
        searchData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getDataWebCCDVTMDT(): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/OnlWebsiteInfo/GetDataWebCCDVTMDT'
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getDataWebTMDTBanHang(
    searhData: OnlWebsiteInfoSearch
  ): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/OnlWebsiteInfo/GetDataWebTMDTBanHang',
        searhData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getDropdown(): Promise<Response<DropdownOptionAntd[]>> {
    try {
      const response = await apiService.get<Response<DropdownOptionAntd[]>>(
        '/OnlWebsiteInfo/GetDropdownList'
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getDropdownListType(type: string): Promise<Response<DropdownOptionAntd[]>> {
    try {
        const response = await apiService.get<Response<DropdownOptionAntd[]>>(
            "/OnlWebsiteInfo/GetDropdownListType",
            { params: { type } }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
  }
}

export const onlWebsiteInfoService = new OnlWebsiteInfoService()
