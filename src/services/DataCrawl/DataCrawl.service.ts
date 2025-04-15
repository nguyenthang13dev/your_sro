
import { createEditType, searchDataCrawlDataType, tableDataCrawlDataType } from "@/interface/DataCrawl/DataCrawl";
import { apiService } from "../index";
import { DataToSend, Response, ResponsePageList } from "@/interface/general";

class DataCrawlService {
  public async getDataByPage(searchData : searchDataCrawlDataType): Promise<Response<ResponsePageList<tableDataCrawlDataType[]>>> {
    try {
      const response = await apiService.post<Response<ResponsePageList<tableDataCrawlDataType[]>>>("/DataCrawl/GetData", searchData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData : createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>("/DataCrawl/Create", formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Update(formData : createEditType): Promise<Response> {
    try {
      const response = await apiService.put<Response>("/DataCrawl/Update", formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>("/DataCrawl/Delete/" + id);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>("/DataCrawl/export");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async exportExcelId(iditem: string, isTieuChi: boolean): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        `/DataCrawl/ExportExcelIditem?iditem=${encodeURIComponent(iditem)}&isTieuChi=${isTieuChi}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async exportTemplateImport(): Promise<Response> {
    try {
      const response = await apiService.get<Response>("/DataCrawl/exportTemplateImport");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getDataImportView(): Promise<Response>{
    try {
      const response = await apiService.get<Response>("/DataCrawl/import");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async saveImport(form: DataToSend): Promise<Response>{
    try {
      const response = await apiService.post<Response>("/DataCrawl/importExcel", form);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async DeleteMany(ids: string[]): Promise<Response> {
    try {
        const response = await apiService.delete<Response>("/DataCrawl/DeleteMany", {
            data: ids // Gửi danh sách ID dưới dạng body
        });
        return response.data;
    } catch (error) {
        throw error;
    }
  }
}

export const dataCrawlService = new DataCrawlService();
