import { apiService } from '../index'
import { DropdownOption, Response } from '@/interface/general'
import {
  WebCCDVTMDTCreate,
  WebCCDVTMDTSearch,
} from '@/interface/webCCDVTMDT/webCCDVTMDT'

class WebCCDVTMDTService {
  public async getDataByPage(searchData: WebCCDVTMDTSearch): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/WebCCDVTMDT/GetData',
        searchData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Create(form: WebCCDVTMDTCreate): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/WebCCDVTMDT/Create',
        form
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Update(form: WebCCDVTMDTCreate): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        '/WebCCDVTMDT/Update',
        form
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>(
        '/WebCCDVTMDT/Delete/' + id
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getDropdown(): Promise<Response<DropdownOption[]>> {
    try {
      const response = await apiService.get<Response<DropdownOption[]>>(
        '/WebCCDVTMDT/GetDropDown'
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>('/WebCCDVTMDT/export')
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getDataWebCCDVTMDTPhanAnh(searchData: WebCCDVTMDTSearch): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/WebCCDVTMDT/GetDataWebCCDVTMDTPhanAnh',
        searchData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const webCCDVTMDTService = new WebCCDVTMDTService()
