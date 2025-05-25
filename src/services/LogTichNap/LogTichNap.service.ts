import { Response } from "@/interface/general";
import { apiService } from "..";

class LogTicNapService
{
    public async GetLogByUser( username: string ) : Promise<Response>
    {
        try {
            const response = await apiService.get<Response>( `/LogTichNap/GetStatusTichNap?userName=${username}` )
            return response.data
        } catch (error) {
            throw error
        }
    }
}


export const qlLogTicNapService = new LogTicNapService();