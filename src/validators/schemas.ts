import { z } from "zod";

// Validação para cadastro de usuario
export const userSchema = z
  .object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    email: z.string().email({ message: "E-mail" }),
    password_hash: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z.string().min(6, { message: "Confirme sua senha" }),
  })
  .refine((data) => data.password_hash === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export const transactionsFilterSchema = z.object({
  title: z.string().optional(),
  categoryId: z.string().optional(),
  startDate: z
    .string()
    .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
      message: "Data inválida",
    }),
  endDate: z
    .string()
    .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
      message: "Data inválida",
    }),
});

export const createCategorySchema = z.object({
  title: z
    .string()
    .min(1, { message: "Deve conter pelo menos 1 caractere." })
    .max(255),
  color: z
    .string()
    .regex(/^#[A-Fa-f0-9]{6}$/, { message: "Deve seguir o padrão #rrggbb" }),
});

export const createTransactionSchema = z.object({
  categoryId: z
    .string()
    .regex(/^(?!null$)/g, { message: "Escolha uma categoria" }),
  title: z
    .string()
    .min(1, { message: "Deve conter pelo menos 1 caractere" })
    .max(255),
  amount: z
    .string()
    .min(1, { message: "Deve conter pelo menos 1 dígito" })
    .max(255),
  date: z.string().regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
    message: "Data inválida",
  }),
  type: z.enum(["receita", "despesa"], {
    errorMap: () => ({ message: "Selecione um tipo válido" }),
  }),
});

export const financeEvolutionFilterSchema = z.object({
  year: z.string().regex(/\d/, { message: "Digite um ano válido" }),
});

export const editTransactionSchema = z.object({
  categoryId: z
    .string()
    .regex(/^(?!null$)/g, { message: "Escolha uma categoria" })
    .optional(),
  title: z
    .string()
    .min(1, { message: "Deve conter pelo menos 1 caractere" })
    .max(255)
    .optional(),
  amount: z
    .string()
    .min(1, { message: "Deve conter pelo menos 1 dígito" })
    .max(255)
    .optional(),
  type: z
    .enum(["receita", "despesa"], {
      errorMap: () => ({ message: "Selecione um tipo válido" }),
    })
    .optional(),
});
