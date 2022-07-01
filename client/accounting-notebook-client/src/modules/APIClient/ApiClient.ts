import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ITransactionResponse } from "common/APISpec/transaction/types";
import { baseURL, transactionRoute } from "common/APISpec/URL";

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

  public getTransactions = () =>
    this.axios.get<
      ITransactionResponse[],
      AxiosResponse<ITransactionResponse[], null>
    >(transactionRoute);
}

export const apiService = ApiService.getInstance();
