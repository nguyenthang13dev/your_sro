import { apiService } from '../index'
import { DropdownOption, DropdownOptionAntd, Response } from '@/interface/general'
import ThuongHieu, {
  DiaPhuongDashboardDto,
  SearchCacThuongHieuDashboard,
  SearchDiaPhuongDashboard,
  ThuongHieuCreate,
  ThuongHieuDashboardDto,
  ThuongHieuSearch,
} from '@/interface/thuongHieu/thuongHieu'

class ThuongHieuService {
  public async getDataByPage(searchData: ThuongHieuSearch): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/ThuongHieu/GetData',
        searchData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Create(form: ThuongHieuCreate): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/ThuongHieu/Create',
        form
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Update(form: ThuongHieuCreate): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        '/ThuongHieu/Update',
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
        '/ThuongHieu/Delete/' + id
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getDropdown(): Promise<Response<DropdownOption[]>> {
    try {
      const response = await apiService.get<Response<DropdownOption[]>>(
        '/ThuongHieu/GetDropDown'
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getDropdownAnt(): Promise<Response<DropdownOptionAntd[]>> {
    try {
      const response = await apiService.get<Response<DropdownOptionAntd[]>>(
        '/ThuongHieu/GetDropdownAnt'
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>('/ThuongHieu/export')
      return response.data
    } catch (error) {
      throw error
    }
  }
  public async getByRepresentativeId(
    id: string
  ): Promise<Response<ThuongHieu[]>> {
    try {
      const response = await apiService.get<Response<ThuongHieu[]>>(
        `/ThuongHieu/GetByRepresentativeId?representativeId=${id}`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }


  public async PhanAnhTheoCacThungHieu(form: SearchCacThuongHieuDashboard): Promise<Response<ThuongHieuDashboardDto[]>> {
    try {
      const response = await apiService.post<Response<ThuongHieuDashboardDto[]>>(
        `/Dashboard/PhanAnhTheoCacThungHieu`,
        form
      )
      return response.data
    } catch (error) {
      throw error
    }
  }


  public async PhanAnhTheoDiaPhuong(form: SearchDiaPhuongDashboard): Promise<Response<DiaPhuongDashboardDto[]>> {
    try {
      const response = await apiService.post<Response<DiaPhuongDashboardDto[]>>(
        `/Dashboard/PhanAnhTheoDiaPhuong`,
        form
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const thuongHieuService = new ThuongHieuService()
