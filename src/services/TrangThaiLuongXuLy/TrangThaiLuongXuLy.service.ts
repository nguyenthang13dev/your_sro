
import { createEditType, searchTrangThaiLuongXuLyData, tableTrangThaiLuongXuLyDataType } from "@/interface/TrangThaiLuongXuLy/TrangThaiLuongXuLy";
import { apiService } from "../index";
import { DataToSend, DropdownOptionAntd, Response, ResponsePageList } from "@/interface/general";

class TrangThaiLuongXuLyService {
  public async getDataByPage(searchData : searchTrangThaiLuongXuLyData): Promise<Response<ResponsePageList<tableTrangThaiLuongXuLyDataType[]>>> {
    try {
      const response = await apiService.post<Response<ResponsePageList<tableTrangThaiLuongXuLyDataType[]>>>("/TrangThaiLuongXuLy/GetData", searchData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData : createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>("/TrangThaiLuongXuLy/Create", formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Update(formData : createEditType): Promise<Response> {
    try {
      const response = await apiService.put<Response>("/TrangThaiLuongXuLy/Update", formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>("/TrangThaiLuongXuLy/Delete/" + id);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>("/TrangThaiLuongXuLy/export");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async exportTemplateImport(): Promise<Response> {
    try {
      const response = await apiService.get<Response>("/TrangThaiLuongXuLy/exportTemplateImport");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getDataImportView(): Promise<Response>{
    try {
      const response = await apiService.get<Response>("/TrangThaiLuongXuLy/import");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async saveImport(form: DataToSend): Promise<Response>{
    try {
      const response = await apiService.post<Response>("/TrangThaiLuongXuLy/importExcel", form);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async getDropdownByIdLuong(idLuongXuLy: string): Promise<Response<DropdownOptionAntd[]>> {
    try {
        const response = await apiService.get<Response<DropdownOptionAntd[]>>(
            '/TrangThaiLuongXuLy/GetDropDownByIdLuong?idLuongXuLy=' + idLuongXuLy
        )
        return response.data
    } catch (error) {
        throw error
    }
}
}

export const trangThaiLuongXuLyService = new TrangThaiLuongXuLyService();
