import { apiService } from '../index'
import { DropdownOptionAntd, Response } from '@/interface/general'
import RaSoatTieuChi, {
  RaSoatTieuChiCreate,
  RaSoatTieuChiSearch,
} from '@/interface/raSoatTieuChi/raSoatTieuChi'

class RaSoatTieuChiService {
  public async getDataByPage(searchData: RaSoatTieuChiSearch): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/RaSoatTieuChi/GetData',
        searchData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Create(form: RaSoatTieuChiCreate): Promise<Response> {
      try {
        const response = await apiService.post<Response>(
          '/RaSoatTieuChi/Create',
          form
        )
        return response.data
      } catch (error) {
        throw error
      }
    }
  
    public async Update(form: RaSoatTieuChiCreate): Promise<Response> {
      try {
        const response = await apiService.put<Response>(
          '/RaSoatTieuChi/Update',
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
        '/RaSoatTieuChi/Delete/' + id
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>('/RaSoatTieuChi/export')
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getDropdown(): Promise<Response<DropdownOptionAntd[]>> {
    try {
      const response = await apiService.get<Response<DropdownOptionAntd[]>>(
        '/RaSoatTieuChi/GetDropdown'
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const raSoatTieuChiService = new RaSoatTieuChiService()
