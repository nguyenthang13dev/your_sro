import {
    createEditType,
    searchQLPage_ApiDataType,
    tableQLPage_ApiDataType,
} from "@/interface/QLPage_Api/QLPage_Api";
import { apiService } from "../index";
import { DataToSend, Response, ResponsePageList } from "@/interface/general";

class QLPage_ApiService {
    public async getDataByPage(
        searchData: searchQLPage_ApiDataType,
    ): Promise<Response<ResponsePageList<tableQLPage_ApiDataType[]>>> {
        try {
            const response = await apiService.post<
                Response<ResponsePageList<tableQLPage_ApiDataType[]>>
            >("/QLPage_Api/GetData", searchData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Create(formData: createEditType): Promise<Response> {
        try {
            const response = await apiService.post<Response>(
                "/QLPage_Api/Create",
                formData,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async GetDropDownDtos(): Promise<Response> {
        try {
            const data = await apiService.get<Response>(
                "/QLPage_Api/GetDropDownDtos",
            );
            return data.data;
        } catch (error) {
            throw error;
        }
    }

    public async GetDsProperty(dtos: string): Promise<Response> {
        try {
            const data = await apiService.get<Response>(
                "/QLPage_Api/GetDsProperty",
                {
                    params: {
                        DtoClassId: dtos,
                    },
                },
            );
            return data.data;
        } catch (error) {
            throw error;
        }
    }

    public async Update(formData: createEditType): Promise<Response> {
        try {
            const response = await apiService.put<Response>(
                "/QLPage_Api/Update",
                formData,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async GetDropDownApi(): Promise<Response> {
        try {
            const response = await apiService.get<Response>(
                "/QLPage_Api/dropdownApi",
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    public async Delete(id: string): Promise<Response> {
        try {
            const response = await apiService.delete<Response>(
                "/QLPage_Api/Delete/" + id,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async exportExcel(): Promise<Response> {
        try {
            const response = await apiService.get<Response>(
                "/QLPage_Api/export",
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async exportTemplateImport(): Promise<Response> {
        try {
            const response = await apiService.get<Response>(
                "/QLPage_Api/exportTemplateImport",
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async getDataImportView(): Promise<Response> {
        try {
            const response = await apiService.get<Response>(
                "/QLPage_Api/import",
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async saveImport(form: DataToSend): Promise<Response> {
        try {
            const response = await apiService.post<Response>(
                "/QLPage_Api/importExcel",
                form,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const qLPage_ApiService = new QLPage_ApiService();
