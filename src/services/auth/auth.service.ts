import {
  LoginType,
  UserType,
  createChangePassViewModel,
  createEditType,
} from "@/interface/auth/User";
import { Response } from "@/interface/general";
import { apiService } from "../index";

class AuthService {
  public async login(formData: LoginType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/Account/Login",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getInfo(): Promise<Response<UserType>> {
    try {
      const response = await apiService.get<Response<UserType>>(
        "/Account/GetInfo"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async checkAccount(username: string): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        `/Account/CheckAccount?username=${username}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async GetAccountRecentLy(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(
        `/Account/GetAccountRecentLy`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async GetBxhIngame(): Promise<Response> {
    try {
      const response = await apiService.get<Response>(`/Account/GetBxhIngame`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async register(formData: createEditType): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/Account/Register",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async changePass(
    formData: createChangePassViewModel
  ): Promise<Response> {
    try {
      const response = await apiService.post<Response>(
        "/Account/ChangePass",
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();
