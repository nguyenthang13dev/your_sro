import { Response } from "@/interface/general";
import { apiService } from "..";
import {
    createEditType,
    PostDataImage,
    searchDataType,
} from "@/interface/QLPages_Banner/QLPages_Banner";

class QLPages_Banner {
    public async GetData(searchData: searchDataType): Promise<Response> {
        try {
            const respoonse = await apiService.post<Response>(
                "/QLPages_Banner/GetData",
                searchData,
            );
            return respoonse.data;
        } catch (err) {
            throw err;
        }
    }

    public async Create(form: createEditType): Promise<Response> {
        try {
            const response = await apiService.post<Response>(
                "/QLPages_Banner/Create",
                form,
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // public async UpdateDsItemId()  {

    // }

    public async Update(form: createEditType): Promise<Response> {
        try {
            const response = await apiService.put<Response>(
                "/QLPages_Banner/Update",
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
                "/QLPages_Banner/Delete/" + id,
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    public async exportExcel(): Promise<Response> {
        try {
            const response = await apiService.get<Response>(
                "/QLPages_Banner/export",
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async UpdateDataImage(form: PostDataImage): Promise<Response> {
        try {
            const response = await apiService.put<Response>(
                "/QLPages_Banner/UpdateDataImage",
                form,
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export const qlPages_BannerService = new QLPages_Banner();
