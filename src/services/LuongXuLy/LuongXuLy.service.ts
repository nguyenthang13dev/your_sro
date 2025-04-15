
import { createEditType, dataSendFormVM, detailDataSendFormVM, nutVM, searchLuongXuLyData, tableLuongXuLyDataType } from "@/interface/LuongXuLy/LuongXuLy";
import { apiService } from "../index";
import { DataToSend, DropdownOptionAntd, Response, ResponsePageList } from "@/interface/general";
import { BuocXuLyAndListNhanSuDto, tableUserDataType } from "@/interface/auth/User";

class LuongXuLyService {
    public async getDataByPage(searchData: searchLuongXuLyData): Promise<Response<ResponsePageList<tableLuongXuLyDataType[]>>> {
        try {
            const response = await apiService.post<Response<ResponsePageList<tableLuongXuLyDataType[]>>>("/LuongXuLy/GetData", searchData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Create(formData: createEditType): Promise<Response> {
        try {
            const response = await apiService.post<Response>("/LuongXuLy/Create", formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Update(formData: createEditType): Promise<Response> {
        try {
            const response = await apiService.put<Response>("/LuongXuLy/Update", formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Delete(id: string): Promise<Response> {
        try {
            const response = await apiService.delete<Response>("/LuongXuLy/Delete/" + id);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async exportExcel(): Promise<Response> {
        try {
            const response = await apiService.get<Response>("/LuongXuLy/export");
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async exportTemplateImport(): Promise<Response> {
        try {
            const response = await apiService.get<Response>("/LuongXuLy/exportTemplateImport");
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async getDataImportView(): Promise<Response> {
        try {
            const response = await apiService.get<Response>("/LuongXuLy/import");
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async saveImport(form: DataToSend): Promise<Response> {
        try {
            const response = await apiService.post<Response>("/LuongXuLy/importExcel", form);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async getDropLuong(): Promise<Response<DropdownOptionAntd[]>> {
        try {
            const response = await apiService.get<Response<DropdownOptionAntd[]>>("/LuongXuLy/GetDropDown");
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async GetDanhSachNhanSuXuLyChinh(formData: dataSendFormVM): Promise<Response<BuocXuLyAndListNhanSuDto>> {
        try {
            const response = await apiService.post<Response<BuocXuLyAndListNhanSuDto>>("/LuongXuLy/GetDanhSachNhanSuXuLyChinh" ,formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    public async GetDanhSachNhanSuXuLyChinhDetail(formData: detailDataSendFormVM): Promise<Response<BuocXuLyAndListNhanSuDto>> {
        try {
            const response = await apiService.post<Response<BuocXuLyAndListNhanSuDto>>("/LuongXuLy/GetDanhSachNhanSuXuLyChinhDetail" ,formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async GetNut(formData: nutVM): Promise<Response> {
        try {
            const response = await apiService.post<Response>("/LuongXuLy/GetNut", formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const luongXuLyService = new LuongXuLyService();
