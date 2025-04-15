import { Layout } from '@/interface/QLPage_Layout/Layout'
import { apiService } from '../index'
import { Response } from '@/interface/general';

class LayoutService {
  public async getLayoutList(): Promise<Response<Layout[]>> {
    try {
      const response = await apiService.get<Response<Layout[]>>(
        '/Layout/GetLayoutList'
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Create(formData: Layout): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/Layout/Create',
        formData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Update(formData: Layout): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        '/Layout/Update',
        formData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>('/Layout/Delete/' + id)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const layoutService = new LayoutService()
