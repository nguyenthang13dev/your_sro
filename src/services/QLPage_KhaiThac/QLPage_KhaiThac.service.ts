import { DataToSend, Response, ResponsePageList } from "@/interface/general";
import { apiService } from "..";
import {
    createEditType,
    searchQLPage_KhaiThacDataType,
    tableQLPage_KhaiThacDataType,
} from "@/interface/QLPage_KhaiThac/QLPage_KhaiThac";

class QLPage_KhaiThac {
    public async getDataByPage(
        searchData: searchQLPage_KhaiThacDataType,
    ): Promise<Response<ResponsePageList<tableQLPage_KhaiThacDataType[]>>> {
        try {
            const response = await apiService.post<
                Response<ResponsePageList<tableQLPage_KhaiThacDataType[]>>
            >("/QLPage_KhaiThac/GetData", searchData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Create(formData: createEditType): Promise<Response> {
        try {
            const response = await apiService.post<Response>(
                "/QLPage_KhaiThac/Create",
                formData,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async GetDropDown(): Promise<Response> {
        try {
            const response = await apiService.get<Response>(
                "/QLPage_KhaiThac/dropDownType",
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    public async GetDropdownCode(typeSearch?: string): Promise<Response> {
        try {
            const response = await apiService.get<Response>(
                "/QLPage_KhaiThac/dropdownCode",
                {
                    params: {
                        typeSearch: typeSearch,
                    },
                },
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Update(formData: createEditType): Promise<Response> {
        try {
            const response = await apiService.put<Response>(
                "/QLPage_KhaiThac/Update",
                formData,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Delete(id: string): Promise<Response> {
        try {
            const response = await apiService.delete<Response>(
                "/QLPage_KhaiThac/Delete/" + id,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async exportExcel(): Promise<Response> {
        try {
            const response = await apiService.get<Response>(
                "/QLPage_KhaiThac/export",
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async exportTemplateImport(): Promise<Response> {
        try {
            const response = await apiService.get<Response>(
                "/QLPage_KhaiThac/exportTemplateImport",
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async getDataImportView(): Promise<Response> {
        try {
            const response = await apiService.get<Response>(
                "/QLPage_KhaiThac/import",
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async saveImport(form: DataToSend): Promise<Response> {
        try {
            const response = await apiService.post<Response>(
                "/QLPage_KhaiThac/importExcel",
                form,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const QLPageKhaiThac = new QLPage_KhaiThac();
