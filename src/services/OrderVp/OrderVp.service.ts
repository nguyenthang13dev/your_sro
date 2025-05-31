import { Response, ResponsePageList } from "@/interface/general";
import { createOrEdit, tableOrderVpDataType, tableOrderVpSearchVMDataType } from "@/interface/OrderVp/OrderVp";
import { apiService } from "..";

class OrderVpService
{
    public async Create(formData: createOrEdit): Promise<Response> {
        try {
          const response = await apiService.post<Response>(
            '/OrderVp/Create',
            formData
          )
          return response.data
        } catch (error) {
          throw error
        }
  }
  
   public async GetDtos(id: string): Promise<Response<tableOrderVpDataType>> {
        try {
          const response = await apiService.get<Response<tableOrderVpDataType>>(
            `/OrderVp/Get/${id}`,
          )
          return response.data
        } catch (error) {
          throw error
        }
  }
  

     public async GetData(formData: tableOrderVpSearchVMDataType): Promise<Response<ResponsePageList<tableOrderVpDataType[]>>> {
        try {
          const response = await apiService.post<Response>(
            `/OrderVp/GetData`,
            formData
          )
          return response.data
        } catch (error) {
          throw error
        }
   }
    
}

export const orderVpService = new OrderVpService();