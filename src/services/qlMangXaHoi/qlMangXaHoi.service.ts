import {
  searchQLMangXaHoiData,
  tableQLMangXaHoiDataType,
  createEditType,
} from "@/interface/QLMangXaHoi/qlMangXaHoi";
import { apiService } from "../index";
import { Response } from "@/interface/general";

class QLMangXaHoiService {
  public async getDataByPage(
    searchData: searchQLMangXaHoiData
  ): Promise<Response> {
    try {
      const response = await apiService.post<
        Response<tableQLMangXaHoiDataType>
      >("/QLMangXaHoi/GetData", searchData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Create(form: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/QLMangXaHoi/Create",
        form
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Update(form: createEditType): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        "/QLMangXaHoi/Update",
        form
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>(
        "/QLMangXaHoi/Delete/" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>("/QLMangXaHoi/export");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const qlMangXaHoiService = new QLMangXaHoiService();
