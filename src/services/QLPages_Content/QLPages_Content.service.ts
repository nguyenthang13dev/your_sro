import {
  searchDataType,
  createEditType,
} from "@/interface/QLPages_Content/QLPages_Content";
import { apiService } from "..";
import { Response } from "@/interface/general";

class QLPages_Content {
  public async getDataByPage(searchData: searchDataType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/QLPages_Content/GetData",
        searchData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async GetById(id: string): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        "/QLPages_Content/Get/" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async GetPageBySlug(slug?: string): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        "/QLPages_Content/GetSlugPage",
        {
          params: {
            SlugPage: slug,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async GetContentPageBySlug(
    slug?: string,
    pageIndex?: number
  ): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        "/QLPages_Content/GetContentPageBySlug",
        {
          params: {
            slug: slug,
            page: pageIndex,
          },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  public async GetContentPageCategory(
    slug?: string,
    key?: string,
    pageIndex?: number
  ): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        "/QLPages_Content/GetTinTucByPage",
        {
          params: {
            slug: slug,
            key: key,
            page: pageIndex,
          },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  public async GetContentPage(idPage: string): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        "/QLPages_Content/GetContentPage",
        {
          params: {
            IdPage: idPage,
          },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  public async GetByIdPage(id: string): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        "/QLPages_Content/GetByIdPage/" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async GetPageHome(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        "/QLPages_Content/GetPageView"
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  public async Create(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/QLPages_Content/Create",
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
        "/QLPages_Content/Update",
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
        "/QLPages_Content/Delete/" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async GetPreviewComponent(codeComponent: string): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        "/QLPages_Content/GetPreviewComponent",
        {
          params: {
            codeComponent: codeComponent,
          },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}
export const qLPages_Content = new QLPages_Content();
