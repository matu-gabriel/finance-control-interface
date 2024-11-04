import { InputMask } from "@react-input/mask";
import { Input } from "../../components/input";
import { Title } from "../../components/title";
import {
  Aside,
  Balance,
  CategoryBadge,
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
import {
  FinanceEvolutionFilterData,
  TransactionsFilterData,
} from "../../validators/types";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  financeEvolutionFilterSchema,
  transactionsFilterSchema,
} from "../../validators/schemas";
import { useCallback, useEffect, useState } from "react";
import { useFetchAPI } from "../../hooks/useFetchAPI";
import { X } from "@phosphor-icons/react";

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

  const financeEvoltionFilterForm = useForm<FinanceEvolutionFilterData>({
    defaultValues: {
      year: dayjs().get("year").toString(),
    },
    resolver: zodResolver(financeEvolutionFilterSchema),
  });

  const {
    transactions,
    fetchTransactions,
    fetchDashboard,
    dashboard,
    financeEvolution,
    fetchFinanceEvolution,
  } = useFetchAPI();

  useEffect(() => {
    const { startDate, endDate } = transactionFilterForm.getValues();
    fetchDashboard({ startDate, endDate });
    fetchTransactions(transactionFilterForm.getValues());
    fetchFinanceEvolution(financeEvoltionFilterForm.getValues());
  }, [
    fetchTransactions,
    transactionFilterForm,
    fetchDashboard,
    fetchFinanceEvolution,
    financeEvoltionFilterForm,
  ]);

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps | null>(null);

  const handleSelectCategory = useCallback(
    async ({ id, title, color }: CategoryProps) => {
      setSelectedCategory({ id, title, color });
      transactionFilterForm.setValue("categoryId", id);

      await fetchTransactions(transactionFilterForm.getValues());
    },
    [transactionFilterForm, fetchTransactions]
  );

  const handleDeselectCategory = useCallback(async () => {
    setSelectedCategory(null);
    transactionFilterForm.setValue("categoryId", "");
    await fetchTransactions(transactionFilterForm.getValues());
  }, [transactionFilterForm, fetchTransactions]);

  const onSubmitDashboard = useCallback(
    async (data: TransactionsFilterData) => {
      const { startDate, endDate } = data;
      await fetchDashboard({ startDate, endDate });
      await fetchTransactions(data);
    },
    [fetchDashboard, fetchTransactions]
  );

  const onSubmitTransactions = useCallback(
    async (data: TransactionsFilterData) => {
      await fetchTransactions(data);
    },
    [fetchTransactions]
  );

  const onSubmitFinanceEvolution = useCallback(
    async (data: FinanceEvolutionFilterData) => {
      await fetchFinanceEvolution(data);
    },
    [fetchFinanceEvolution]
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
                onClick={transactionFilterForm.handleSubmit(onSubmitDashboard)}
              />
            </InputGroup>
          </Filters>
          <Balance>
            <Card title="Saldo" amount={dashboard?.balanço?.balanço || 0} />
            <Card
              title="Receitas"
              amount={dashboard?.balanço?.receita || 0}
              variant="incomes"
            />
            <Card
              title="Despesas"
              amount={dashboard?.balanço?.despesa * -1 || 0}
              variant="expenses"
            />
          </Balance>
          <ChartContainer>
            <header>
              <Title
                title="Gastos"
                subtitle="Despesas por categorias no período"
              />
              {selectedCategory && (
                <CategoryBadge
                  $color={selectedCategory.color}
                  onClick={handleDeselectCategory}
                >
                  <X />
                  {selectedCategory.title.toUpperCase()}
                </CategoryBadge>
              )}
            </header>
            <ChartContent>
              <CategoriesChart
                despesa={dashboard?.despesa}
                onClick={handleSelectCategory}
              />
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
                  mask="aaaa"
                  replacement={{ a: /\d/ }}
                  variant="black"
                  label="Ano"
                  placeholder="aaaa"
                  {...financeEvoltionFilterForm.register("year")}
                />
                <ButtonIncon
                  onClick={financeEvoltionFilterForm.handleSubmit(
                    onSubmitFinanceEvolution
                  )}
                />
              </ChartAction>
            </header>
            <ChartContent>
              <FinancialEvolutionBar financeEvolution={financeEvolution} />
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
            {transactions?.length > 0 &&
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
