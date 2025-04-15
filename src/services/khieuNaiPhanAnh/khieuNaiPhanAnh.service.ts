import { DaiDienThuongHieuDashboardDto } from '@/interface/Dashboard/dashboard'
import { apiService } from '../index'
import { Response } from '@/interface/general'
import KhieuNaiPhanAnhView, {
  KetQuaKhieuNai,
  KhieuNaiDashboard,
  KhieuNaiPhanAnh,
  KhieuNaiPhanAnhCreate,
  KhieuNaiPhanAnhSearch,
  SearchKhieuNaiDashboard,
} from '@/interface/khieuNaiPhanAnh/khieuNaiPhanAnh'
import {
  SearchCacThuongHieuDashboard,
  ThuongHieuDashboardDto,
} from '@/interface/thuongHieu/thuongHieu'

class KhieuNaiPhanAnhService {
  public async getDataByPage(
    searchData: KhieuNaiPhanAnhSearch
  ): Promise<Response> {
    try {
      const response = await apiService.post<Response<KhieuNaiPhanAnhView>>(
        '/khieuNaiPhanAnh/GetData',
        searchData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Create(form: KhieuNaiPhanAnhCreate): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/khieuNaiPhanAnh/Create',
        form
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Update(form: KhieuNaiPhanAnhCreate): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        '/khieuNaiPhanAnh/Update',
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
        '/khieuNaiPhanAnh/Delete/' + id
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async GetViolatioHistory(
    type: string,
    id: string
  ): Promise<Response<KhieuNaiPhanAnhView[]>> {
    try {
      const response = await apiService.get<Response<KhieuNaiPhanAnhView[]>>(
        `/khieuNaiPhanAnh/GetViolationHistory?type=${type}&id=${id}`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async exportExcel(search: any): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/khieuNaiPhanAnh/export',
        search
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async ChangeStatus(id: string, status: string): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        '/khieuNaiPhanAnh/ChangeStatus',
        {
          id,
          status,
        }
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async GetByRaSoatId(id: string): Promise<Response<KhieuNaiPhanAnh[]>> {
    try {
      const response = await apiService.get<Response<KhieuNaiPhanAnh[]>>(
        `/khieuNaiPhanAnh/GetByRaSoatId?raSoatId=${id}`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async GetKetQuaGhiNhan(
    id: string
  ): Promise<Response<KetQuaKhieuNai[]>> {
    try {
      const response = await apiService.get<Response<KetQuaKhieuNai[]>>(
        `/khieuNaiPhanAnh/GetKetQuaGhiNhan?raSoatId=${id}`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async GetDataTinhHinhPhanAnhDashboard(
    form: SearchKhieuNaiDashboard
  ): Promise<Response<KhieuNaiDashboard[]>> {
    try {
      const response = await apiService.post<Response<KhieuNaiDashboard[]>>(
        `/Dashboard/IndexTinhHinhPhanAnh`,
        form
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
  //phản ánh theo sản phẩm
  public async GetComplaintsPieChart(
    startDate?: string,
    endDate?: string
  ): Promise<
    Response<{ category: string; percent: number; quantity: number }[]>
  > {
    try {
      const response = await apiService.get<
        Response<{ category: string; percent: number; quantity: number }[]>
      >(
        `/Dashboard/GetComplaintsPieChart?startDate=${
          startDate ?? ''
        }&endDate=${endDate ?? ''}`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  //phản ánh theo từng thương hiệu
  public async GetBrandRepresentativeComplaintsPieChart(
    brandRepresentativeId?: string,
    year?: number
  ): Promise<Response<DaiDienThuongHieuDashboardDto>> {
    try {
      const response = await apiService.get<
        Response<DaiDienThuongHieuDashboardDto>
      >(
        `/Dashboard/GetBrandComplaintsPieChart?brandRepresentativeId=${
          brandRepresentativeId ?? ''
        }&year=${year ?? ''}`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async GetProductViolationHistory(
    id: string
  ): Promise<Response<KhieuNaiPhanAnh[]>> {
    try {
      const response = await apiService.get<Response<KhieuNaiPhanAnh[]>>(
        `/khieuNaiPhanAnh/GetProductViolationHistory?id=${id}`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async GetBrandViolationHistory(
    brandId: string
  ): Promise<Response<KhieuNaiPhanAnh[]>> {
    try {
      const response = await apiService.get<Response<KhieuNaiPhanAnh[]>>(
        `/khieuNaiPhanAnh/GetBrandViolationHistory?brandId=${brandId}`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async GetNhomHangHoaDichVu(
    form: SearchCacThuongHieuDashboard
  ): Promise<Response<KhieuNaiDashboard[]>> {
    try {
      const response = await apiService.post<Response<KhieuNaiDashboard[]>>(
        `/Dashboard/PhanAnhHangHoaDichVu`,
        form
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const khieuNaiPhanAnhService = new KhieuNaiPhanAnhService()
