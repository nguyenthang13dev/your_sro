
import { createEditType, searchQLTinTuc_CommentDataType, tableQLTinTuc_CommentDataType } from "@/interface/QLTinTuc_Comment/QLTinTuc_Comment";
import { apiService } from "../index";
import { DataToSend, Response, ResponsePageList } from "@/interface/general";

class QLTinTuc_CommentService {
  public async getDataByPage(searchData : searchQLTinTuc_CommentDataType): Promise<Response<ResponsePageList<tableQLTinTuc_CommentDataType[]>>> {
    try {
      const response = await apiService.post<Response<ResponsePageList<tableQLTinTuc_CommentDataType[]>>>("/QLTinTuc_Comment/GetData", searchData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData : createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>("/QLTinTuc_Comment/Create", formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Update(formData : createEditType): Promise<Response> {
    try {
      const response = await apiService.put<Response>("/QLTinTuc_Comment/Update", formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>("/QLTinTuc_Comment/Delete/" + id);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>("/QLTinTuc_Comment/export");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async exportTemplateImport(): Promise<Response> {
    try {
      const response = await apiService.get<Response>("/QLTinTuc_Comment/exportTemplateImport");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getDataImportView(): Promise<Response>{
    try {
      const response = await apiService.get<Response>("/QLTinTuc_Comment/import");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async saveImport(form: DataToSend): Promise<Response>{
    try {
      const response = await apiService.post<Response>("/QLTinTuc_Comment/importExcel", form);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const qLTinTuc_CommentService = new QLTinTuc_CommentService();
