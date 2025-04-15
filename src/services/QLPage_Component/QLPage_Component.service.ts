import {
  createEditType,
  searchQLPage_ComponentDataType,
  tableQLPage_ComponentDataType,
} from '@/interface/QLPage_Component/QLPage_Component'
import { apiService } from '../index'
import { DataToSend, Response, ResponsePageList } from '@/interface/general'

class QLPage_ComponentService {
  public async getDataByPage(
    searchData: searchQLPage_ComponentDataType
  ): Promise<Response<ResponsePageList<tableQLPage_ComponentDataType[]>>> {
    try {
      const response = await apiService.post<
        Response<ResponsePageList<tableQLPage_ComponentDataType[]>>
      >('/QLPage_Component/GetData', searchData)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getListComponent(
    searchData: searchQLPage_ComponentDataType
  ): Promise<Response<tableQLPage_ComponentDataType[]>> {
    try {
      const response = await apiService.post<
        Response<tableQLPage_ComponentDataType[]>
      >('/QLPage_Component/GetDataComponent', searchData)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Create(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/QLPage_Component/Create',
        formData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async GetDropDown(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        '/QLPage_Component/dropDownType'
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
  public async GetDropdownCode(typeSearch?: string): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        '/QLPage_Component/dropdownCode',
        {
          params: {
            typeSearch: typeSearch,
          },
        }
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Update(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        '/QLPage_Component/Update',
        formData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>(
        '/QLPage_Component/Delete/' + id
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        '/QLPage_Component/export'
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async exportTemplateImport(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        '/QLPage_Component/exportTemplateImport'
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getDataImportView(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        '/QLPage_Component/import'
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async saveImport(form: DataToSend): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/QLPage_Component/importExcel',
        form
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async clone(id: string): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/QLPage_Component/Clone',
        { id }
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const qLPage_ComponentService = new QLPage_ComponentService()
