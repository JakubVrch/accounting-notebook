import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { baseURL } from "common/APISpec/URL";

const config: AxiosRequestConfig<null> = {
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
};

class ApiService {
  private static instance: ApiService;
  private axios: AxiosInstance;

  private constructor() {
    const http = axios.create(config);

    this.axios = http;
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public createRequestFunction<responseDataType = unknown>(route: string) {
    return () =>
      this.axios.get<responseDataType, AxiosResponse<responseDataType, null>>(
        route
      );
  }
}

export const apiService = ApiService.getInstance();
