import { Response, ResponsePageList } from "@/interface/general";

import { createEditType, tableSilkTichNapSearchType } from "@/interface/QLSilkTichNap/QLSilkTichNap";
import { apiService } from "..";

class SilkTichNapService {
  public async Create(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/SilkTichNap/Create",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Update(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        "/SilkTichNap/Update",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
    }
    

  public async GetData(formData: tableSilkTichNapSearchType): Promise<Response<ResponsePageList>> {
    try {
      const response = await apiService.post<Response<ResponsePageList>>(
        "/SilkTichNap/GetData",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
    

    public async Delete( id: string ): Promise<Response>
    {
        try
        {
            const response = await apiService.delete<Response>(
                "/SilkTichNap/Delete/" + id
            );
            return response.data;
        } catch ( error )
        {
            throw error;
        }

    }
}

export const qlSilkTichNapService = new SilkTichNapService();
