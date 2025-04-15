import {
    searchQLTinTuc_Widget,
    tableQLTinTuc_Widget,
    createEditType,
    searchQLTinTuc_WidgetTB,
    tableQLTInTuc_WidgetPreVMDataType,
} from "@/interface/QLTinTuc_Widget/QLTinTuc_Widget";
import { apiService } from "..";
import { DropdownOption, Response } from "@/interface/general";

class QLTinTuc_Widget {
    public async GetData(searchData: searchQLTinTuc_Widget): Promise<Response> {
        try {
            const respoonse = await apiService.post<
                Response<tableQLTinTuc_Widget>
            >("/QLTinTuc_Widget/GetData", searchData);
            return respoonse.data;
        } catch (err) {
            throw err;
        }
    }

    public async GetDropDownWidget(): Promise<Response> {
        try {
            const response = await apiService.get<Response<DropdownOption>>(
                "/QLTinTuc_Widget/getDropDownWds",
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    public async GetWidget(): Promise<Response> {
        try {
            const respoonse = await apiService.get<
                Response<tableQLTinTuc_Widget>
            >("/QLTinTuc_Widget/GetWidget");
            return respoonse.data;
        } catch (err) {
            throw err;
        }
    }

    public async GetPublish(
        searchData: searchQLTinTuc_WidgetTB,
    ): Promise<Response> {
        try {
            const response = await apiService.post<
                Response<tableQLTinTuc_Widget>
            >("/QLTinTuc_Widget/GetDataPublish", searchData);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    public async Create(formData: createEditType): Promise<Response> {
        try {
            const response = await apiService.post<Response>(
                "/QLTinTuc_Widget/Create",
                formData,
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    public async Delete(id: string): Promise<Response> {
        try {
            const response = await apiService.delete<Response>(
                "/QLTinTuc_Widget/Delete/" + id,
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    public async UpdateTypePre(
        formBody: tableQLTInTuc_WidgetPreVMDataType,
    ): Promise<Response> {
        try {
            const response = await apiService.post<Response>(
                "/QLTinTuc_Widget/UpdateTypePre",
                formBody,
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    public async exportExcel(): Promise<Response> {
        try {
            const response = await apiService.get<Response>(
                "/QLTinTuc_Widget/export",
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const qLTinTuc_Widget = new QLTinTuc_Widget();
