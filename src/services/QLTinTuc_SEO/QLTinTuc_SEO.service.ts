import {
    searchDataType,
    createEditType,
} from "@/interface/QLTinTuc_SEO/QLTinTuc_SEO";
import { apiService } from "..";
import { DropdownOption, Response } from "@/interface/general";

class QLTinTuc_SEO {
    public async GetData(searchData: searchDataType): Promise<Response> {
        try {
            const response = await apiService.post<Response>(
                "/QLTinTuc_SEO/Create",
                searchData,
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    public async Create(form: createEditType): Promise<Response> {
        try {
            const response = await apiService.post<Response>(
                "/QLTinTuc_SEO/Create",
                form,
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    public async Update(form: createEditType): Promise<Response> {
        try {
            const response = await apiService.put<Response>(
                "/QLTinTuc_SEO/Update",
                form,
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    public async Delete(id: string): Promise<Response> {
        try {
            const response = await apiService.delete<Response>(
                "/QLTinTuc_SEO/Delete/" + id,
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    public async GetDropDown(): Promise<Response<DropdownOption[]>> {
        try {
            const response = await apiService.get<Response<DropdownOption[]>>(
                "/QLTinTuc_SEO/GetDropDown",
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    public async exportExcel(): Promise<Response> {
        try {
            const response = await apiService.get<Response>(
                "/QLTinTuc_SEO/export",
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const qLTinTuc_SEO = new QLTinTuc_SEO();
