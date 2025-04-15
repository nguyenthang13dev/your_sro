import { apiService } from '../index'
import { DropdownOption, Response } from '@/interface/general'
import ThongKeTinDaGui, {
  ThongKeTinDaGuiCreate,
  ThongKeTinDaGuiSearch,
} from '@/interface/thongKeTinDaGui/thongKeTinDaGui'

class ThongKeTinDaGuiService {
  public async getDataByPage(searchData: ThongKeTinDaGuiSearch): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/ThongKeTinDaGui/GetData',
        searchData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Create(form: ThongKeTinDaGuiCreate): Promise<Response> {
      try {
        const response = await apiService.post<Response>(
          '/ThongKeTinDaGui/Create',
          form
        )
        return response.data
      } catch (error) {
        throw error
      }
    }
  
    public async Update(form: ThongKeTinDaGuiCreate): Promise<Response> {
      try {
        const response = await apiService.put<Response>(
          '/ThongKeTinDaGui/Update',
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
        '/ThongKeTinDaGui/Delete/' + id
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>('/ThongKeTinDaGui/export')
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getDataThongBaoByItemId(iditem: string): Promise<Response> {
      try {
        const response = await apiService.get<Response>(
          '/ThongKeTinDaGui/GetDataThongBaoByItemId/'+ iditem
        )
        return response.data
      } catch (error) {
        throw error
      }
  }

  public async getDataDanhSach(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        '/ThongKeTinDaGui/GetDataDanhSach'
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const thongKeTinDaGuiService = new ThongKeTinDaGuiService()
