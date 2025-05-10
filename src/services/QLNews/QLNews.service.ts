import { Response } from "@/interface/general";
import { createEditType, searchQLNewsType } from "@/interface/QLNews/QLNews";
import { apiService } from "..";

class QLNewsService {
    public async getDataByPage( formData: searchQLNewsType ): Promise<Response>
    {
        try
        {
            const response = await apiService.post<Response>(
                "/QLNews/GetData",
                    formData
                );
                return response.data;
        } catch ( err )
        {
            throw err;
        }
    }
    public async Create(formData: createEditType): Promise<Response>
    {
        try {
            const response = await apiService.post<Response>("/QLNews/Create",
                formData );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    public async GetGroupData(formData: searchQLNewsType): Promise<Response>
    {
        try {
            const response = await apiService.post<Response>("/QLNews/GetGroupData",
                formData );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    public async Update(formData: createEditType): Promise<Response>
    {
        try {
            const response = await apiService.put<Response>( "/QLNews/Update",
                formData );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Delete(id: string): Promise<Response>
    {
        try {
            const response = await apiService.delete<Response>( `/QLNews/Delete/${id}`,
                );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export const qlnewsservice = new QLNewsService();