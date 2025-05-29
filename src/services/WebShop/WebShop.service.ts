import { Response, ResponsePageList } from "@/interface/general";

import { searchWebShopSearchVM, tableWebShopDataType, webShopCreateVMDataType } from "@/interface/WebShop/WebShop";
import { apiService } from "..";

class WebShopeService {
  public async getDataByPage(
    searchData?: searchWebShopSearchVM
  ): Promise<Response<ResponsePageList<tableWebShopDataType[]>>> {
    try {
      const response = await apiService.post<
        Response<ResponsePageList<tableWebShopDataType[]>>
      >("/WebShop/GetData", searchData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData: webShopCreateVMDataType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/WebShop/Create",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Update(formData: webShopCreateVMDataType): Promise<Response> {
    try {
      const response = await apiService.put<Response>(
        "/WebShop/Update",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Delete(id: string): Promise<Response> {
    try {
      const response = await apiService.delete<Response>(
        "/WebShop/Delete/" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getDropDown(selected: string): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/GiftCode/GetDropGiftCodeItem",
        selected
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
//   async AddGiftCodeForPlayer(formData: tableAddItemModelDataType): Promise<Response> {
//     try {
//       const response = await apiService.post<Response>(
//         "/GiftCode/AddGiftCodeForPlayer",
//         formData
//       );
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
}

export const qlWebShopeService = new WebShopeService();
