import DaiDienThuongHieu, {
  DaiDienThuongHieuSearch,
} from "@/interface/daiDienThuongHieu/daiDienThuongHieu";
import { apiService } from "../index";
import { DropdownOption, Response } from "@/interface/general";

class DaiDienThuongHieuService {
  public async getDataByPage(
    searchData: DaiDienThuongHieuSearch
  ): Promise<Response> {
    try {
      const response = await apiService.post<Response<DaiDienThuongHieu>>(
        "/DaiDienThuongHieu/GetData",
        searchData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Create(form: DaiDienThuongHieu): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/DaiDienThuongHieu/Create",
        form
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Update(form: DaiDienThuongHieu): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        "/DaiDienThuongHieu/Update",
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
        "/DaiDienThuongHieu/Delete/" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async getDropdown(): Promise<Response<DropdownOption[]>> {
    try {
      const response = await apiService.get<Response<DropdownOption[]>>(
        "/DaiDienThuongHieu/GetDropDown"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        "/DaiDienThuongHieu/export"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: string): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        `/DaiDienThuongHieu/Get/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const daiDienThuongHieuService = new DaiDienThuongHieuService();
