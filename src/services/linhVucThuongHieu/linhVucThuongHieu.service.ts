import { searchLinhVucThuongHieuData, createEditType } from "@/interface/linhVucThuongHieu/linhVucThuongHieu";
import { apiService } from "../index";
import { Response, DropdownOption } from "@/interface/general";

class LinhVucThuongHieuService {
    public async getDataByPage(searchData: searchLinhVucThuongHieuData): Promise<Response> {
        try {
            const response = await apiService.post<Response>("/LinhVucThuongHieu/GetDataMongo", searchData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Create(formData: createEditType): Promise<Response> {
        try {
            const response = await apiService.post<Response>("/LinhVucThuongHieu/CreateMongo", formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Update(formData: createEditType): Promise<Response> {
        try {
            const response = await apiService.put<Response>("/LinhVucThuongHieu/UpdateMongo", formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Delete(id: string): Promise<Response> {
        try {
            const response = await apiService.delete<Response>("/LinhVucThuongHieu/DeleteMongo/" + id);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async getDropdown(): Promise<Response<DropdownOption[]>> {
        try {
          const response = await apiService.get<Response<DropdownOption[]>>(
            '/LinhVucThuongHieu/GetDropdown'
          )
          return response.data
        } catch (error) {
          throw error
        }
    }

}

export const linhVucThuongHieuService = new LinhVucThuongHieuService();
