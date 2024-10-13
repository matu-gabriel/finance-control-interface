export type CreateCategory = {
  title: string;
  color: string;
};

export type Category = {
  _id: string;
  title: string;
  color: string;
};

export type CreateTransaction = {
  categoryId: string;
  title: string;
  amount: number;
  type: "receita" | "despesa";
  date: string;
};

export type TransactionFilter = {
  title?: string;
  categoryId?: string;
  startDate: string;
  endDate: string;
};

export type Transaction = {
  _id: string;
  title: string;
  amount: number;
  type: "receita" | "despesa";
  date: Date;
  category: Category;
};

export type Balance = {
  _id: string | null;
  receita: number;
  despesa: number;
  balanço: number;
};

export type Expense = {
  _id: string;
  title: string;
  amount: number;
  color: string;
};

export type Dashboard = {
  balanço: Balance;
  // despesa: Expense[];
};

export type DashboardFilters = {
  startDate: string;
  endDate: string;
};
