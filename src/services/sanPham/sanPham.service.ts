import { apiService } from "../index";
import { DropdownOption, Response } from "@/interface/general";
import SanPham, {
  CacSanPhamViPhamDashboard,
  SanPhamSearch,
  SanPhamView,
  SearchCacSanPhamViPhamboard,
  SearchImage,
} from "@/interface/sanPham/sanPham";

class SanPhamService {
  public async getDataByPage(searchData: SanPhamSearch): Promise<Response> {
    try {
      const response = await apiService.post<Response<SanPhamView>>(
        "/SanPham/GetData",
        searchData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Create(form: SanPham): Promise<Response> {
    try {
      const response = await apiService.post<Response>("/SanPham/Create", form);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Update(form: SanPham): Promise<Response> {
    try {
      const response = await apiService.put<Response>("/SanPham/Update", form);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>(
        "/SanPham/Delete/" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async getDropdown(): Promise<Response<DropdownOption[]>> {
    try {
      const response = await apiService.get<Response<DropdownOption[]>>(
        "/SanPham/GetDropDown"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async exportExcel(): Promise<Response> {
    try {
      const response = await apiService.get<Response>("/SanPham/export");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async CacSanPhamViPhamTable(
    form: SearchCacSanPhamViPhamboard
  ): Promise<Response<CacSanPhamViPhamDashboard[]>> {
    try {
      const response = await apiService.post<
        Response<CacSanPhamViPhamDashboard[]>
      >(`/Dashboard/CacSanPhamViPhamTable`, form);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async TimKiemHinhAnh(form: SearchImage): Promise<Response> {
    try {
      const response = await apiService.post<Response<SanPhamView>>(
        "/SanPham/TimKiemHinhAnh",
        form
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async TimKiemMoTa(form: string): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/SanPham/TimKiemMoTa",
        form
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async ExportTimKiemImage(
    idsSanPhamExport: string[]
  ): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/SanPham/ExportTimKiemImage",
        idsSanPhamExport
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const sanPhamService = new SanPhamService();
