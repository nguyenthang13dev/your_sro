import { Response, ResponsePageList } from "@/interface/general";
import
  {
    createEditType,
    searchGiftCode,
    tableAddItemModelDataType,
    tableGiftCode,
  } from "@/interface/GiftCode/GiftCode";
import { apiService } from "..";

class GiftCodeService {
  public async getDataByPage(
    searchData?: searchGiftCode
  ): Promise<Response<ResponsePageList<tableGiftCode[]>>> {
    try {
      const response = await apiService.post<
        Response<ResponsePageList<tableGiftCode[]>>
      >("/GiftCode/GetData", searchData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async Create(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/GiftCode/Create",
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
        "/GiftCode/Update",
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
        "/GiftCode/Delete/" + id
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
  async AddGiftCodeForPlayer(formData: tableAddItemModelDataType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/GiftCode/AddGiftCodeForPlayer",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const giftCodeService = new GiftCodeService();
