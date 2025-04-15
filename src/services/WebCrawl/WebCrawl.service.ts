
import { createEditType, searchWebCrawlDataType, tableWebCrawlDataType } from "@/interface/WebCrawl/WebCrawl";
import { apiService } from "../index";
import { DataToSend, Response, ResponsePageList } from "@/interface/general";

class WebCrawlService {
    public async getDataByPage(searchData: searchWebCrawlDataType): Promise<Response<ResponsePageList<tableWebCrawlDataType[]>>> {
        try {
            const response = await apiService.post<Response<ResponsePageList<tableWebCrawlDataType[]>>>("/WebCrawl/GetData", searchData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Create(formData: createEditType): Promise<Response> {
        try {
            const response = await apiService.post<Response>("/WebCrawl/Create", formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Update(formData: createEditType): Promise<Response> {
        try {
            const response = await apiService.put<Response>("/WebCrawl/Update", formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async Delete(id: string): Promise<Response> {
        try {
            const response = await apiService.delete<Response>("/WebCrawl/Delete/" + id);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async exportExcel(): Promise<Response> {
        try {
            const response = await apiService.get<Response>("/WebCrawl/export");
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async exportTemplateImport(): Promise<Response> {
        try {
            const response = await apiService.get<Response>("/WebCrawl/exportTemplateImport");
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async getDataImportView(): Promise<Response> {
        try {
            const response = await apiService.get<Response>("/WebCrawl/import");
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async saveImport(form: DataToSend): Promise<Response> {
        try {
            const response = await apiService.post<Response>("/WebCrawl/importExcel", form);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async GetCrawl(id: string): Promise<Response> {
        try {
            const response = await apiService.get<Response>("/WebCrawl/GetCrawl/" + id);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async GetCrawlTieuChi(id: string): Promise<Response> {
        try {
            const response = await apiService.get<Response>("/WebCrawl/GetCrawlTieuChi/" + id);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const webCrawlService = new WebCrawlService();
