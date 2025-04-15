// import PhanAnhView, {
//   PhanAnh,
//   PhanAnhCreate,
//   PhanAnhSearch,
// } from '@/interface/phanAnh/phanAnh'
import { apiService } from '../index'
import { Response } from '@/interface/general'

class PhanAnhService {
  // public async getDataByPage(searchData: PhanAnhSearch): Promise<Response> {
  //   try {
  //     const response = await apiService.post<Response<PhanAnhView>>(
  //       '/PhanAnh/GetData',
  //       searchData
  //     )
  //     return response.data
  //   } catch (error) {
  //     throw error
  //   }
  // }

  // public async Create(form: PhanAnhCreate): Promise<Response> {
  //   try {
  //     const response = await apiService.post<Response>('/PhanAnh/Create', form)
  //     return response.data
  //   } catch (error) {
  //     throw error
  //   }
  // }

  // public async Update(form: PhanAnhCreate): Promise<Response> {
  //   try {
  //     const response = await apiService.put<Response>('/PhanAnh/Update', form)
  //     return response.data
  //   } catch (error) {
  //     throw error
  //   }
  // }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>(
        '/PhanAnh/Delete/' + id
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
  public async ChangeStatus(param: any): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        '/PhanAnh/ChangeStatus',
        param
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  // public async GetViolatioHistory(
  //   type: string,
  //   id: string
  // ): Promise<Response<PhanAnh[]>> {
  //   try {
  //     const response = await apiService.get<Response<PhanAnh[]>>(
  //       `/PhanAnh/GetViolationHistory?type=${type}&id=${id}`
  //     )
  //     return response.data
  //   } catch (error) {
  //     throw error
  //   }
  // }
  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>('/PhanAnh/export')
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const phanAnhService = new PhanAnhService()
