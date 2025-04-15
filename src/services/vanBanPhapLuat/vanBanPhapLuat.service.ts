import {
  createEditVanBanPhapLuatType,
  searchVanBanPhapLuatDataType,
} from "@/interface/vanBanPhapLuat/vanBanPhapLuat";
import { apiService } from "../index";
import { BaseUrlModuleApiConstant } from "@/constants/BaseUrlModuleApiConstant";
import { Response } from "@/interface/general";

class VanBanPhapLuat {
  private baseUrlApi: string;
  constructor(baseUrl: string) {
    this.baseUrlApi = baseUrl;
  }
  public async GetListVanBanPhapLuat(
    searchByPage: searchVanBanPhapLuatDataType
  ): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        `${this.baseUrlApi}/GetData`,
        searchByPage
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  public async Create(
    formData: createEditVanBanPhapLuatType
  ): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        `${this.baseUrlApi}/Create`,
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async ThongKeDuLieu(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        `${this.baseUrlApi}/ThongKeDuLieuVanBan`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async GetDropDownTrangThai(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        `${this.baseUrlApi}/dropDownTrangThai`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Update(
    formData: createEditVanBanPhapLuatType
  ): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        `${this.baseUrlApi}/Update`,
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
        `${this.baseUrlApi}/Delete/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async UpdateTrangThaiVanBan(
    id: string,
    code: string
  ): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        `${this.baseUrlApi}/UpdateTrangThaiVanBan`,
        {
          Code: code,
          Id: id,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export const vanBanPhapLuatService = new VanBanPhapLuat(
  BaseUrlModuleApiConstant.VanBanPhapLuat
);
