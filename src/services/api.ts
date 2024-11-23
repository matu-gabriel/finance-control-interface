import axios from "axios";
import {
  Category,
  CreateCategory,
  CreateTransaction,
  Dashboard,
  DashboardFilters,
  EditTransaction,
  FinanceEvolution,
  FinanceEvolutionFilters,
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

  static async getFinanceEvolution({
    year,
  }: FinanceEvolutionFilters): Promise<FinanceEvolution[]> {
    const { data } = await APIService.client.get<FinanceEvolution[]>(
      "/transaction/finance-evolution",
      { params: { year } }
    );
    return data;
  }

  static async editTransaction(
    transactionId: string,
    editTransactionData: EditTransaction
  ): Promise<Transaction> {
    const { title, amount, type, categoryId } = editTransactionData;
    const { data } = await APIService.client.put<Transaction>(
      `/transaction/${transactionId}`,
      {
        title,
        amount,
        type,
        categoryId,
      }
    );
    return data;
  }

  static async deleteTransaction(transactionId: string): Promise<void> {
    try {
      await APIService.client.delete(`/transaction/${transactionId}`);
    } catch (error) {
      console.error("Erro na API ao excluir transação:", error);
      throw new Error("Erro ao excluir transação.");
    }
  }

  // Função de registro
  static async register(registerData: CreateUserData): Promise<void> {
    await APIService.client.post("/user", registerData);
  }
}
