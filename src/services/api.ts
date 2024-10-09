import axios from "axios";
import { Category, CreateCategory } from "./api-types";
import { CreateUserData } from "../validators/types";

export class APIService {
  private static client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

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

  static async createCategory(
    createCategoryData: CreateCategory
  ): Promise<Category> {
    const { data } = await APIService.client.post<Category>(
      "/category",
      createCategoryData
    );
    console.log(data);

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
