import axios from "axios";
import {
  Category,
  CreateCategory,
  CreateTransaction,
  Dashboard,
  DashboardFilters,
  Transaction,
  TransactionFilter,
} from "./api-types";
import { CreateUserData } from "../validators/types";

export class APIService {
  private static client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  static async getDashboard({
    startDate,
    endDate,
  }: DashboardFilters): Promise<Dashboard> {
    const { data } = await APIService.client.get<Dashboard>(
      "/transaction/report",
      {
        params: {
          startDate,
          endDate,
        },
      }
    );
    return data;
  }

  static setupInterceptor() {
    APIService.client.interceptors.request.use(
      (config) => {
        const userData = localStorage.getItem("userData");

        if (userData) {
          const parsedUserData = JSON.parse(userData);
          const token = parsedUserData?.token;
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  static async createTransaction(
    createTransactionData: CreateTransaction
  ): Promise<Transaction> {
    const { data } = await APIService.client.post<Transaction>(
      "/transaction",
      createTransactionData
    );
    return data;
  }

  static async getTransactions({
    title,
    categoryId,
    startDate,
    endDate,
  }: TransactionFilter): Promise<Transaction[]> {
    const { data } = await APIService.client.get<Transaction[]>(
      "/transaction",
      {
        params: {
          ...(title?.length && { title }),
          ...(categoryId?.length && { categoryId }),
          startDate,
          endDate,
        },
      }
    );
    return data;
  }

  static async createCategory(
    createCategoryData: CreateCategory
  ): Promise<Category> {
    const { data } = await APIService.client.post<Category>(
      "/category",
      createCategoryData
    );

    return data;
  }

  static async getCategories(): Promise<Category[]> {
    const { data } = await APIService.client.get<Category[]>("/categories");

    return data;
  }

  // Função de registro
  static async register(registerData: CreateUserData): Promise<void> {
    await APIService.client.post("/user", registerData);
  }
}
