import { ConfigGiftSilkType, createEditConfigGiftSilkType, searchConfigGiftSilkData } from '@/interface/ConfigGiftSilk/ConfigGiftSilk'
import { DropdownOption, Response } from '@/interface/general'
import { apiService } from '..'

class ConfigGiftSilkService {
  public async GetData(searchData: searchConfigGiftSilkData): Promise<Response> {
    try {
      const response = await apiService.post<Response<ConfigGiftSilkType[]>>(
        '/ConfigGiftSilk/GetData',
        searchData
      )
      return response.data
    } catch (err) {
      throw err
    }
  }

  public async Create(form: createEditConfigGiftSilkType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/ConfigGiftSilk/Create',
        form
      )
      return response.data
    } catch (err) {
      throw err
    }
  }

  public async Update(form: createEditConfigGiftSilkType): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        '/ConfigGiftSilk/Update',
        form
      )
      return response.data
    } catch (err) {
      throw err
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>(
        '/ConfigGiftSilk/Delete/' + id
      )
      return response.data
    } catch (err) {
      throw err
    }
  }

  public async GetDropDownGift(): Promise<Response<DropdownOption[]>> {
    try {
      const response = await apiService.get<Response<DropdownOption[]>>(
        '/Gift/GetDropDown'
      )
      return response.data
    } catch (err) {
      throw err
    }
  }

  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>('/ConfigGiftSilk/export')
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const configGiftSilkService = new ConfigGiftSilkService()