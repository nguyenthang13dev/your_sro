import {
  searchQLTinTucData,
  searchTinTucFWidDataType,
} from '@/interface/qlTinTuc/qlTinTuc'
import { apiService } from '../index'
import { Response } from '@/interface/general'

class QLTinTucService {
  public async getDataByPage(
    searchData: searchQLTinTucData
  ): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/QLTinTuc/GetDataMongo',
        searchData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Create(formData: any): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/QLTinTuc/CreateMongo',
        formData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async Update(formData: any): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        '/QLTinTuc/UpdateMongo',
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
        '/QLTinTuc/DeleteMongo/' + id
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  // public async SendEmail(
  //     subject: string,
  //     body: string,
  //     toAddress: string,
  // ): Promise<Response> {
  //     try {
  //         const formData = new FormData();
  //         formData.append("subject", subject);
  //         formData.append("body", body);
  //         formData.append("toAddress", toAddress);
  //         const response = await apiService.post<Response>(
  //             "/QLTinTuc/SendEmail",
  //             formData,
  //         );
  //         return response.data;
  //     } catch (error) {
  //         throw error;
  //     }
  // }

  public async getStatistics(): Promise<Response> {
    try {
      const response = await apiService.get<Response>('/QLTinTuc/GetStatistics')
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async TitleToSlug(id: string | undefined): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        '/QLTinTuc/TitleToSlug/' + id
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async GetAllTinTucs(
    searchWidgets: searchTinTucFWidDataType
  ): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        '/QLTinTuc/GetAllTintuc',
        searchWidgets
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async configReaction(form: {
    id: string
    like: number
    comment: number
  }): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        '/QLTinTuc/configReaction',
        form
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const qlTinTucService = new QLTinTucService()
