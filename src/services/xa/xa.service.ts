import { apiService } from "../index";
import { Response } from "@/interface/general";

class XaService {
    public async GetDropdown(maHuyen: string): Promise<Response> {
        try {
            const response = await apiService.get<Response>(`/Xa/GetDropdown/${maHuyen}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const xaService = new XaService();
