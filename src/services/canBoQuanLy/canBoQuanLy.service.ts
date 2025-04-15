import {
  CanBoQuanLyByDept,
  searchCanBoQuanLyData,
} from '@/interface/canBoQuanLy/canBoQuanLy'
import { apiService } from '../index'
import { Response } from '@/interface/general'

class CanBoQuanLyService {
  public async getDataByPage(
    searchData: searchCanBoQuanLyData
  ): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/CanBoQuanLy/GetDataMongo',
        searchData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Create(formData: FormData): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/CanBoQuanLy/CreateMongo',
        formData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Update(formData: FormData): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        '/CanBoQuanLy/UpdateMongo',
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
        '/CanBoQuanLy/DeleteMongo/' + id
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async ToggleLock(id: string): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        '/CanBoQuanLy/ToggleLock/' + id
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
  public async getByDeptId(
    deptId: string
  ): Promise<Response<CanBoQuanLyByDept[]>> {
    try {
      const response = await apiService.get<Response<CanBoQuanLyByDept[]>>(
        `/CanBoQuanLy/GetByDeptId?deptId=${deptId}`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async exportExcel(searchParams: searchCanBoQuanLyData): Promise<Response> {
    try {
      const response = await apiService.post<Response>('/CanBoQuanLy/export', searchParams)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const canBoQuanLyService = new CanBoQuanLyService()
