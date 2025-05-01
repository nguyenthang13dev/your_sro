import { ConfigSilkType, createEditType, searchConfigSilkDataType } from "@/interface/ConfigSilk/ConfigSilk"
import { Response } from "@/interface/general"
import { apiService } from ".."

class ConfigSilkService
{
      public async GetData(searchData: searchConfigSilkDataType): Promise<Response> {
    try {
      const respoonse = await apiService.post<Response<ConfigSilkType>>(
        '/ConfigSilk/GetData',
        searchData
      )
      return respoonse.data
    } catch (err) {
      throw err
    }
  }

  public async Create(form: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/ConfigSilk/Create',
        form
      )
      return response.data
    } catch (err) {
      throw err
    }
  }

  public async Update(form: createEditType): Promise<Response> {
    try {
      const response = await apiService.put<Response>('/ConfigSilk/Update', form)
      return response.data
    } catch (err) {
      throw err
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>(
        '/ConfigSilk/Delete/' + id
      )
      return response.data
    } catch (err) {
      throw err
    }
  }
}


export const configSilkService = new ConfigSilkService()