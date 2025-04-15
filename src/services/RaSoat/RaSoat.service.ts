import {
  createEditType,
  ketLuanVM,
  searchRaSoatData,
  tableRaSoatDataType,
} from "@/interface/RaSoat/RaSoat";
import { apiService } from "../index";
import { DataToSend, Response, ResponsePageList } from "@/interface/general";

class RaSoatService {
  public async getDataByPage(
    searchData: searchRaSoatData
  ): Promise<Response<ResponsePageList<tableRaSoatDataType[]>>> {
    try {
      const response = await apiService.post<
        Response<ResponsePageList<tableRaSoatDataType[]>>
      >("/RaSoat/GetData", searchData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/RaSoat/Create",
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
        "/RaSoat/Update",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async GetDataCanhBaoThacCong(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        "/RaSoat/GetDataCanhBaoThacCong"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>(
        "/RaSoat/Delete/" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async GetDetail(id: string): Promise<Response> {
    try {
      const response = await apiService.get<Response>("/RaSoat/Get/" + id);
      return response.data;
    } catch (error) {
      throw error;
    } 
  }

  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>("/RaSoat/export");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async exportTemplateImport(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        "/RaSoat/exportTemplateImport"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getDataImportView(): Promise<Response> {
    try {
      const response = await apiService.get<Response>("/RaSoat/import");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async saveImport(form: DataToSend): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/RaSoat/importExcel",
        form
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async changeStatus(id: string, status: string): Promise<Response> {
    try {
      const response = await apiService.put<Response>("/RaSoat/ChangeStatus", {
        id,
        status,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async changeResult(id: string, status: string): Promise<Response> {
    try {
      const response = await apiService.put<Response>("/RaSoat/ChangeKetQua", {
        id,
        status,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getRaSoatByIdUser(
    id: string | null | undefined
  ): Promise<Response<tableRaSoatDataType[]>> {
    try {
      const response = await apiService.get<Response>(
        "/RaSoat/GetRaSoatByIdUser/" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async KetLuanRaSoat(formData: ketLuanVM): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/RaSoat/KetLuanRaSoat",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getDetailCanhBao(idCanhBao: string): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        `/RaSoat/GetDetailCanhBao?idCanhBao=${idCanhBao}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const raSoatService = new RaSoatService();
