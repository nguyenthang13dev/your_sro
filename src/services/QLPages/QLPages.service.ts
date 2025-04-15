import {
  searchQLPagesDataType,
  tableQLPagesDataType,
} from '@/interface/QLPage/qLPage'
import { apiService } from '../index'
import { DropdownTreeOptionAntd, Response } from '@/interface/general'

class QLPagesService {
  public async getDataByPage(
    searchData: searchQLPagesDataType
  ): Promise<Response> {
    try {
      const response = await apiService.post<Response<tableQLPagesDataType>>(
        '/QLPages/GetData',
        searchData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Create(form: FormData): Promise<Response> {
    try {
      const response = await apiService.post<Response>('/QLPages/Create', form)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Update(form: FormData): Promise<Response> {
    try {
      const response = await apiService.put<Response>('/QLPages/Update', form)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>(
        '/QLPages/Delete/' + id
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>('/QLPages/export')
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getPageDropdown(): Promise<Response<DropdownTreeOptionAntd[]>> {
    try {
      const response = await apiService.get<Response<DropdownTreeOptionAntd[]>>(
        `/QLPages/GetPageDropdown`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const qlPagesService = new QLPagesService()
