import { ResponsePageList, Response } from "@/interface/general";
import { apiService } from "..";
import {
  tableGiftCodeItem,
  searchGiftCodeItem,
  createEditType,
} from "@/interface/GiftCodeItem/GiftCodeItem";

class GiftCodeItemService {
  public async getDataByPage(
    searchData: searchGiftCodeItem
  ): Promise<Response<ResponsePageList<tableGiftCodeItem[]>>> {
    try {
      const response = await apiService.post<
        Response<ResponsePageList<tableGiftCodeItem[]>>
      >("/GiftCodeItem/GetData", searchData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/GiftCodeItem/Create",
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
        "/GiftCodeItem/Update",
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
        "/GiftCodeItem/Delete/" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getDropDown(selected: string): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/GiftCodeItem/GetDropGiftCodeItem",
        selected
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const giftCodeItemService = new GiftCodeItemService();
