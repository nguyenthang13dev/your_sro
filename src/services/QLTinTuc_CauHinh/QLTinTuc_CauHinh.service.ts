import {
  createEditType,
  searchQLTinTuc_CauHinhDataType,
  tableQLTinTuc_CauHinhDataType,
} from "@/interface/QLTinTuc_CauHinh/QLTinTuc_CauHinh";
import { apiService } from "../index";
import { DataToSend, Response, ResponsePageList } from "@/interface/general";

class QLTinTuc_CauHinhService {
  public async getDataByPage(
    searchData: searchQLTinTuc_CauHinhDataType
  ): Promise<Response<ResponsePageList<tableQLTinTuc_CauHinhDataType[]>>> {
    try {
      const response = await apiService.post<
        Response<ResponsePageList<tableQLTinTuc_CauHinhDataType[]>>
      >("/QLTinTuc_CauHinh/GetData", searchData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/QLTinTuc_CauHinh/Create",
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
        "/QLTinTuc_CauHinh/Update",
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
        "/QLTinTuc_CauHinh/Delete/" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        "/QLTinTuc_CauHinh/export"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async exportTemplateImport(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        "/QLTinTuc_CauHinh/exportTemplateImport"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async GetById(id: string): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        `/QLTinTuc_CauHinh/Get/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getDataImportView(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        "/QLTinTuc_CauHinh/import"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getDropDown(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        "/QLTinTuc_CauHinh/getDropDown"
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  public async saveImport(form: DataToSend): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/QLTinTuc_CauHinh/importExcel",
        form
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getAllCauHinh(): Promise<
    Response<tableQLTinTuc_CauHinhDataType[]>
  > {
    try {
      const response = await apiService.get<
        Response<tableQLTinTuc_CauHinhDataType[]>
      >("/QLTinTuc_CauHinh/GetAllCauHinh");

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const qLTinTuc_CauHinhService = new QLTinTuc_CauHinhService();
