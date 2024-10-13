import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Category, Dashboard, Transaction } from "../services/api-types";
import {
  CreateCategoryData,
  CreateTransactionData,
  TransactionsFilterData,
} from "../validators/types";
import { APIService } from "../services/api";
import { formatDate } from "../utils/formatDate";

interface FetchAPIProps {
  createCategory: (data: CreateCategoryData) => Promise<void>;
  createTransaction: (data: CreateTransactionData) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchTransactions: (filters: TransactionsFilterData) => Promise<void>;
  transactions: Transaction[];
  fetchDashboard: (
    filters: Pick<TransactionsFilterData, "startDate" | "endDate">
  ) => Promise<void>;
  dashboard: Dashboard;
  categories: Category[];
}

const FetchAPIContext = createContext<FetchAPIProps>({} as FetchAPIProps);

type FetchAPIProviderProps = {
  children: ReactNode;
};

export function FetchAPIProvider({ children }: FetchAPIProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dashboard, setDashboard] = useState<Dashboard>({} as Dashboard);

  const createCategory = useCallback(async (data: CreateCategoryData) => {
    await APIService.createCategory(data);
  }, []);

  const createTransaction = useCallback(async (data: CreateTransactionData) => {
    await APIService.createTransaction({
      ...data,
      date: formatDate(data.date),
      amount: Number(data.amount.replace(/[^0-9]/g, "")),
    });
  }, []);

  const fetchCategories = useCallback(async () => {
    const data = await APIService.getCategories();

    setCategories(data);
  }, []);

  const fetchTransactions = useCallback(
    async (filters: TransactionsFilterData) => {
      const transactions = await APIService.getTransactions({
        ...filters,
        startDate: formatDate(filters.startDate),
        endDate: formatDate(filters.endDate),
      });

      setTransactions(transactions);
    },
    []
  );

  const fetchDashboard = useCallback(
    async ({
      startDate,
      endDate,
    }: Pick<TransactionsFilterData, "startDate" | "endDate">) => {
      const dashboard = await APIService.getDashboard({
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      });
      setDashboard(dashboard);
    },
    []
  );

  return (
    <FetchAPIContext.Provider
      value={{
        categories,
        createCategory,
        fetchCategories,
        createTransaction,
        fetchTransactions,
        transactions,
        fetchDashboard,
        dashboard,
      }}
    >
      {children}
    </FetchAPIContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFetchAPI(): FetchAPIProps {
  return useContext(FetchAPIContext);
}
