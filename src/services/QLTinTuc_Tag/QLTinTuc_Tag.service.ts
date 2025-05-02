import
    {
        DropdownOption,
        Response
    } from "@/interface/general";
import
    {
        createEditType,
        QLTinTuc_TagType,
        searchQLTinTuc_TagData,
    } from "@/interface/QLTinTuc_Tag/QLTinTuc_Tag";
import { apiService } from "..";

class QLTinTuc_TagService {
    public async GetData(
        searchData: searchQLTinTuc_TagData,
    ): Promise<Response> {
        try {
            const respoonse = await apiService.post<Response<QLTinTuc_TagType>>(
                "/QLTinTuc_Tag/GetData",
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
                "/QLTinTuc_Tag/Create",
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
                "/QLTinTuc_Tag/Update",
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
                "/QLTinTuc_Tag/Delete/" + id,
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    public async GetDropDown(): Promise<Response<DropdownOption[]>> {
        try {
            const response = await apiService.get<Response<DropdownOption[]>>(
                "/QLTinTuc_Tag/GetDropDown",
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    public async exportExcel(): Promise<Response> {
        try {
            const response = await apiService.get<Response>(
                "/QLTinTuc_Tag/export",
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const qLTinTuc_TagService = new QLTinTuc_TagService();
