import { Response } from "@/interface/general";
import { tableOrderCreateVMDataType } from "@/interface/Order/Order";
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
}

export const orderService = new OrderService();