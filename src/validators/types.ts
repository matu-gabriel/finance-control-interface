import { z } from "zod";
import {
  createCategorySchema,
  createTransactionSchema,
  financeEvolutionFilterSchema,
  loginSchema,
  transactionsFilterSchema,
  userSchema,
} from "./schemas";

export type CreateUserData = z.infer<typeof userSchema>;

export type LoginUserData = z.infer<typeof loginSchema>;

export type CreateCategoryData = z.infer<typeof createCategorySchema>;

export type CreateTransactionData = z.infer<typeof createTransactionSchema>;

export type TransactionsFilterData = z.infer<typeof transactionsFilterSchema>;

export type FinanceEvolutionFilterData = z.infer<
  typeof financeEvolutionFilterSchema
>;
