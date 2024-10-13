import { InputMask } from "@react-input/mask";
import { Input } from "../../components/input";
import { Title } from "../../components/title";
import {
  Aside,
  Balance,
  ChartAction,
  ChartContainer,
  ChartContent,
  Filters,
  Header,
  InputGroup,
  Main,
  SearchTransaction,
  Section,
  TransactionGroup,
} from "./styles";
import { ButtonIncon } from "../../components/button-icon";
import { Card } from "../../components/card";
import { Transaction } from "../../components/transaction";
import { CreateCategoryDialog } from "../../components/create-category-dialog";
import { CreateTransactionDialog } from "../../components/create-transaction-dialog";
import { Logo } from "../../components/logo";
import {
  CategoriesChart,
  CategoryProps,
} from "../../components/categories-chart";
import { FinancialEvolutionBar } from "../../components/financial-evolution-bar";
import { LogoutDropDown } from "../../components/dropDown";
import { useForm } from "react-hook-form";
import { TransactionsFilterData } from "../../validators/types";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionsFilterSchema } from "../../validators/schemas";
import { useCallback, useEffect, useState } from "react";
import { useFetchAPI } from "../../hooks/useFetchAPI";

export function Home() {
  const transactionFilterForm = useForm<TransactionsFilterData>({
    defaultValues: {
      title: "",
      categoryId: "",
      startDate: dayjs().startOf("month").format("DD/MM/YYYY"),
      endDate: dayjs().endOf("month").format("DD/MM/YYYY"),
    },
    resolver: zodResolver(transactionsFilterSchema),
  });

  const { transactions, fetchTransactions } = useFetchAPI();

  useEffect(() => {
    fetchTransactions(transactionFilterForm.getValues());
  }, [fetchTransactions, transactionFilterForm]);

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps | null>(null);

  const handleSelectCategory = useCallback(
    ({ id, title, color }: CategoryProps) => {
      setSelectedCategory({ id, title, color });
      transactionFilterForm.setValue("categoryId", id);
    },
    [transactionFilterForm]
  );

  const handleDeselectCategory = useCallback(() => {
    setSelectedCategory(null);
    transactionFilterForm.setValue("categoryId", "");
  }, [transactionFilterForm]);

  const onSubmitTransactions = useCallback(
    async (data: TransactionsFilterData) => {
      console.log("Dados enviados:", data); // Verifique se as datas estão corretas
      await fetchTransactions(data);
      console.log("Teste");
    },
    [fetchTransactions]
  );

  return (
    <>
      <Header>
        <Logo />
        <div>
          <CreateTransactionDialog />
          <CreateCategoryDialog />
          <LogoutDropDown />
        </div>
      </Header>
      <Main>
        <Section>
          <Filters>
            <Title title="Saldo" subtitle="Receita e despesas dos período" />
            <InputGroup>
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Início"
                placeholder="dd/mm/aaaa"
                {...transactionFilterForm.register("startDate")}
              />
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Fim"
                placeholder="dd/mm/aaaa"
                {...transactionFilterForm.register("endDate")}
              />
              <ButtonIncon
                onClick={transactionFilterForm.handleSubmit(
                  onSubmitTransactions
                )}
              />
            </InputGroup>
          </Filters>
          <Balance>
            <Card title="Saldo" amount={1000000} />
            <Card title="Saldo" amount={1000000} variant="incomes" />
            <Card title="Saldo" amount={1000000} variant="expenses" />
          </Balance>
          <ChartContainer>
            <header>
              <Title
                title="Gastos"
                subtitle="Despesas por categorias no período"
              />
            </header>
            <ChartContent>
              <CategoriesChart onClick={handleSelectCategory} />
            </ChartContent>
          </ChartContainer>
          <ChartContainer>
            <header>
              <Title
                title="Evolução financeira"
                subtitle="Saldo, Receitas e Gastos no ano"
              />
              <ChartAction>
                <InputMask
                  component={Input}
                  mask="dd/mm/aaaa"
                  replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                  variant="black"
                  label="ano"
                  placeholder="aaaa"
                />
                <ButtonIncon />
              </ChartAction>
            </header>
            <ChartContent>
              <FinancialEvolutionBar />
            </ChartContent>
          </ChartContainer>
        </Section>
        <Aside>
          <header>
            <Title title="Transações" subtitle="Receita e Gastos no período" />
            <SearchTransaction>
              <Input
                variant="black"
                placeholder="Procurar transação"
                {...transactionFilterForm.register("title")}
              />
              <ButtonIncon
                onClick={transactionFilterForm.handleSubmit(
                  onSubmitTransactions
                )}
              />
            </SearchTransaction>
          </header>
          <TransactionGroup>
            {transactions?.length &&
              transactions.map((transaction, index) => (
                <Transaction
                  key={transaction._id}
                  id={index + 1}
                  title={transaction.title}
                  amount={
                    transaction.type === "despesa"
                      ? transaction.amount * -1
                      : transaction.amount
                  }
                  date={dayjs(transaction.date)
                    .add(3, "hours")
                    .format("DD/MM/YYYY")}
                  category={{
                    title: transaction.category.title,
                    color: transaction.category.color,
                  }}
                  variant={transaction.type}
                />
              ))}
          </TransactionGroup>
        </Aside>
      </Main>
    </>
  );
}
