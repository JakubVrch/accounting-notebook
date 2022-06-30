import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { ITransactionResponse } from "common/APISpec/transaction/types";
import { baseURL, transactionRoute } from "common/APISpec/URL";

function convertDateAttributes(data: ITransactionResponse[]) {
  return data.map((element) => {
    element.date = new Date(element.date);
    return element;
  });
}

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
    this.axios
      .get<ITransactionResponse[], AxiosResponse<ITransactionResponse[], null>>(
        transactionRoute
      )
      .then((response) => {
        response.data = convertDateAttributes(response.data);
        return response;
      })
      .catch((error: Error | AxiosError) => {
        //TODO: Delete, kept this if potentially needed
        if (axios.isAxiosError(error)) {
          return Promise.reject(error);
        } else {
          return null;
        }
      });
}

export const apiService = ApiService.getInstance();
