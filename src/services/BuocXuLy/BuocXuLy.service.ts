import {
  createEditType,
  searchBuocXuLyDataType,
  tableBuocXuLyDataType,
} from "@/interface/BuocXuLy/BuocXuLy";
import { apiService } from "../index";
import {
  DataToSend,
  DropdownOptionAntd,
  Response,
  ResponsePageList,
} from "@/interface/general";
import { GoModel } from "@/interface/goModel/goModel";

class BuocXuLyService {
  public async getDataByPage(
    searchData: searchBuocXuLyDataType
  ): Promise<Response<ResponsePageList<tableBuocXuLyDataType[]>>> {
    try {
      const response = await apiService.post<
        Response<ResponsePageList<tableBuocXuLyDataType[]>>
      >("/BuocXuLy/GetData", searchData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/BuocXuLy/Create",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Update(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        "/BuocXuLy/Update",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>(
        "/BuocXuLy/Delete/" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>("/BuocXuLy/export");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async exportTemplateImport(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        "/BuocXuLy/exportTemplateImport"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getDataImportView(): Promise<Response> {
    try {
      const response = await apiService.get<Response>("/BuocXuLy/import");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async saveImport(form: DataToSend): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/BuocXuLy/importExcel",
        form
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async GetDiagramData(idLuongXuLy: string): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        `/BuocXuLy/GetDiagramData?idLuongXuLy=${idLuongXuLy}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async SaveStateLocation(formData: any): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        "/BuocXuLy/SaveStateLocation",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const buocXuLyService = new BuocXuLyService();
