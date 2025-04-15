import GhiNhanKetQuaVM, { KetQuaGhiNhan } from './../../interface/ketQuaGhiNhan/ketQuaGhiNhan.d'
import { apiService } from '../index'
import { Response } from '@/interface/general'

class KetQuaGhiNhanService {
  public async getDataByPage(searchData: KetQuaGhiNhan): Promise<Response> {
    try {
      const response = await apiService.post<Response<KetQuaGhiNhan>>(
        '/KetQuaGhiNhan/GetData',
        searchData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Create(form: GhiNhanKetQuaVM): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/KetQuaGhiNhan/Create',
        form
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Update(form: KetQuaGhiNhan): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        '/KetQuaGhiNhan/Update',
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
        '/KetQuaGhiNhan/Delete/' + id
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async GetByLichSuXuLyId(id: string): Promise<KetQuaGhiNhan[]> {
    try {
      const response = await apiService.get<Response<KetQuaGhiNhan[]>>(
        '/KetQuaGhiNhan/GetByLichSuXuLyId?Id=' + id
      )
      return response.data.data
    } catch (error) {
      throw error
    }
  }
}

export const ketQuaGhiNhanService = new KetQuaGhiNhanService()
