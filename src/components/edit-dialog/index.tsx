import { useCallback, useEffect } from "react";
import { Button } from "../button";
import { Input } from "../input";
import {
  Container,
  Content,
  CurrencyInput,
  ErrorMessage,
  InputGroup,
  RadioForm,
  RadioGroup,
} from "./style";
import { useFetchAPI } from "../../hooks/useFetchAPI";
import { Controller, useForm } from "react-hook-form";

import { formatCurrency } from "../../utils/formatCurrency";
import { EditTransactionData } from "../../validators/types";
import { editTransactionSchema } from "../../validators/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

type EditDialogProps = {
  handleClose: () => void;
  transactionId: string;
  title: string;
  amount: number;
  category: {
    _id: string;
    title: string;
    color: string;
  };
};

export function EditDialog({
  title,
  amount,
  category,
  transactionId,
  handleClose,
}: EditDialogProps) {
  const { fetchCategories, categories, editTransaction } = useFetchAPI();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EditTransactionData>({
    defaultValues: {
      title: title,
      amount: formatCurrency(amount),
      categoryId: category._id,
      type: "despesa",
    },
    resolver: zodResolver(editTransactionSchema),
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onSubmit = useCallback(
    async (data: EditTransactionData) => {
      try {
        await editTransaction(transactionId, data); // Certifique-se de que data.categoryId está correto
        handleClose(); // Fecha o modal
      } catch (error) {
        console.error("Erro ao editar transação:", error);
      }
    },
    [transactionId, editTransaction, handleClose]
  );

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Content>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Nome"
                placeholder="Nome da transação..."
                value={field.value}
                // error={errors.title?.message}
              />
            )}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          <InputGroup>
            <label>Valor</label>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <CurrencyInput
                  {...field}
                  placeholder="R$ 0,00"
                  format="currency"
                  currency="BRL"
                  locales="pt-BR"
                  value={field.value}
                />
              )}
            />
            {errors.amount && (
              <ErrorMessage>{errors.amount.message}</ErrorMessage>
            )}
          </InputGroup>
          <InputGroup>
            <label>Categoria</label>
            <Controller
              name="categoryId"
              control={control}
              // defaultValue={category._id}
              render={({ field }) => (
                <select
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {/* <option value="">Selecione uma categoria...</option> */}
                  {categories?.length &&
                    categories.map((categorie) => (
                      <option key={categorie._id} value={categorie._id}>
                        {categorie.title}
                      </option>
                    ))}
                </select>
              )}
            />
          </InputGroup>
          <RadioForm>
            <RadioGroup>
              <input
                type="radio"
                id="receita"
                defaultValue="receita"
                {...register("type")}
              />
              <label htmlFor="receita">Receita</label>
            </RadioGroup>
            <RadioGroup>
              <input
                type="radio"
                id="despesa"
                defaultValue="despesa"
                {...register("type")}
              />
              <label htmlFor="despesa">Gasto</label>
            </RadioGroup>
            {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
          </RadioForm>
        </Content>
        <footer>
          <Button onClick={handleClose} variant="outline" type="button">
            Cancelar
          </Button>
          <Button type="submit">Editar</Button>
        </footer>
      </form>
    </Container>
  );
}
