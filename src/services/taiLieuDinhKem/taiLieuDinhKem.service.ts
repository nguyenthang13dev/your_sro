import { Response } from "@/interface/general";
import { apiService } from "..";

class TaiLieuDinhKemService {
    public static async AddPdfPath(AttachId: string): Promise<Response> {
        try {
            const response = await apiService.get<Response>(
                `TaiLieuDinhKem/AddPathPdf?AttachId=${AttachId}`,
            );
            return response.data;
        } catch (err) {
            return {
                data: null,
                status: false,
                message: "failed",
            } as Response;
        }
    }
}
export default TaiLieuDinhKemService;
