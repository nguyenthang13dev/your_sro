import LichSuXuLy, { PhanAnhTheoDonViChuTriDashboard, ProcessHistory, SearchPhanAnhTheoDonViChuTriboard } from '@/interface/LichSuXuLy/lichSuXuLy'
import { apiService } from '../index'
import { Response, ResponsePageList } from '@/interface/general'

class LichSuXuLyService {
  public async getDataByPage(
    searchData: LichSuXuLy
  ): Promise<Response<ResponsePageList<LichSuXuLy[]>>> {
    try {
      const response = await apiService.post<
        Response<ResponsePageList<LichSuXuLy[]>>
      >('/LichSuXuLy/GetData', searchData)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Create(formData: LichSuXuLy): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/LichSuXuLy/Create',
        formData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Update(formData: LichSuXuLyService): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        '/LichSuXuLy/Update',
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
        '/LichSuXuLy/Delete/' + id
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>('/LichSuXuLy/export')
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async exportTemplateImport(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        '/LichSuXuLy/exportTemplateImport'
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async GetByRaSoatId(id: string): Promise<ProcessHistory[]> {
    try {
      const response = await apiService.get<Response<ProcessHistory[]>>(
        `/LichSuXuLy/GetByRaSoatId?raSoatId=${id}`
      )
      return response.data.data
    } catch (error) {
      throw error
    }
  }

  public async PhanAnhTheoDonViChuTriTable(form: SearchPhanAnhTheoDonViChuTriboard): Promise<Response<PhanAnhTheoDonViChuTriDashboard[]>> {
    try {
      const response = await apiService.post<Response<PhanAnhTheoDonViChuTriDashboard[]>>(
        `/Dashboard/PhanAnhTheoDonViChuTriTable`,
        form
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const lichSuXuLyService = new LichSuXuLyService()
