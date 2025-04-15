import {
  searchWebTMDTBanHang,
  createEditType,
} from "@/interface/webTMDTBanHang/webTMDTBanHang";
import { apiService } from "../index";
import { DropdownOption, Response } from "@/interface/general";

class WebTMDTBanHangService {
  public async getDataByPage(
    searchData: searchWebTMDTBanHang
  ): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/WebTMDTBanHang/GetData",
        searchData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Create(form: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/WebTMDTBanHang/Create",
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
        "/WebTMDTBanHang/Update",
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
        "/WebTMDTBanHang/Delete/" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getDropdown(): Promise<Response<DropdownOption[]>> {
    try {
      const response = await apiService.get<Response<DropdownOption[]>>(
        "/WebTMDTBanHang/GetDropDown"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>("/WebTMDTBanHang/export");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getDataWebTMDTBanHangPhanAnh(
    searchData: searchWebTMDTBanHang
  ): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/WebTMDTBanHang/GetDataWebTMDTBanHangPhanAnh",
        searchData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const webTMDTBanHangService = new WebTMDTBanHangService();
