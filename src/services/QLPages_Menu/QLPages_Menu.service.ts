import {
  searchQLPages_MenuDataType,
  createEditType,
} from '@/interface/QLPages_Menu/QLPages_Menu'
import { apiService } from '..'
import { DropdownTreeOptionAntd, Response } from '@/interface/general'

class QLPages_Menu_Service {
  public async getDataByPage(
    searchData: searchQLPages_MenuDataType
  ): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/QLPages_Menu/GetData',
        searchData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async GetById(id: string): Promise<Response> {
    try {
      const response = await apiService.get<Response>('/QLPages_Menu/Get/' + id)
      return response.data
    } catch (error) {
      throw error
    }
  }
  public async GetByIdPage(id: string): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        '/QLPages_Menu/GetByIdPage/' + id
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async GetPageHome(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        '/QLPages_Menu/GetPageView'
      )
      return response.data
    } catch (err) {
      throw err
    }
  }

  public async Create(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/QLPages_Menu/Create',
        formData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Update(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        '/QLPages_Menu/Update',
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
        '/QLPages_Menu/Delete/' + id
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async exportExcel(type: 'QLPages_Menu'): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        `/QLPages_Menu/export?type=${type}`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getdropdownTree(
    disabledMenuIds?: string[]
  ): Promise<Response<DropdownTreeOptionAntd[]>> {
    try {
      const param = disabledMenuIds ? disabledMenuIds.join(',') : ''
      const response = await apiService.get<Response<DropdownTreeOptionAntd[]>>(
        `/QLPages_Menu/GetDropdownTree?disabledMenuIds=${param}`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async configCode(form: {
    id: string
    htmlCode: string
    cssCode: string
  }): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        `/QLPages_Menu/ConfigCode`,
        form
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async CreateOrUpdate(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/QLPages_Menu/CreateOrUpdate',
        formData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const QLPageMenuService = new QLPages_Menu_Service()
