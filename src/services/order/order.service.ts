import { Response, ResponsePageList } from "@/interface/general";
import { tableOrderCreateVMDataType, tableOrderDataType, tableOrderSearchVMDataType } from "@/interface/Order/Order";
import { apiService } from "..";

class OrderService
{
    public async Create(formData: tableOrderCreateVMDataType): Promise<Response> {
        try {
          const response = await apiService.post<Response>(
            '/Order/Create',
            formData
          )
          return response.data
        } catch (error) {
          throw error
        }
  }
  
   public async GetDtos(id: string): Promise<Response<tableOrderCreateVMDataType>> {
        try {
          const response = await apiService.get<Response<tableOrderCreateVMDataType>>(
            `/Order/Get/${id}`,
          )
          return response.data
        } catch (error) {
          throw error
        }
  }
  

     public async GetDate(formData: tableOrderSearchVMDataType): Promise<Response<ResponsePageList<tableOrderDataType[]>>> {
        try {
          const response = await apiService.post<Response>(
            `/Order/GetData`,
            formData
          )
          return response.data
        } catch (error) {
          throw error
        }
   }
     public async GetTotalMoney(formData: string): Promise<Response> {
        try {
          const response = await apiService.get<Response>(
            `/Order/GetTotalMoney?username=${formData}`,
          )
          return response.data
        } catch (error) {
          throw error
        }
   }
}

export const orderService = new OrderService();