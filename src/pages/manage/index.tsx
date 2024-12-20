import { useCallback, useEffect, useState } from "react";
import {
  ActionsContainer,
  Card,
  CardContent,
  ContentContainer,
  DashboardContainer,
  Header,
  InputGroup,
  MainContent,
  Sidebar,
  SidebarButton,
  SidebarHeader,
  SidebarNav,
  ViewModeButton,
} from "./style";
import { List, NotePencil, SquaresFour, Trash } from "@phosphor-icons/react";
import { useFetchAPI } from "../../hooks/useFetchAPI";
import dayjs from "dayjs";
import { formatCurrency } from "../../utils/formatCurrency";
import { InputMask } from "@react-input/mask";
import { ButtonIncon } from "../../components/button-icon";
import { useForm } from "react-hook-form";
import { TransactionsFilterData } from "../../validators/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionsFilterSchema } from "../../validators/schemas";
import { Input } from "../../components/input";
import { Dialog } from "@mui/material";
import { EditDialog } from "../../components/edit-dialog";
import { Transaction } from "../../services/api-types";
import { toast } from "react-toastify";
import { APIService } from "../../services/api";

type ViewMode = "grid" | "list";
type ActiveSection = "categories" | "transactions";

export function Manage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeSection, setActiveSection] =
    useState<ActiveSection>("categories");
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleOpen = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenDialog(true);
  };
  const handleClose = () => setOpenDialog(false);

  const handleDelete = async (transactionId: string) => {
    try {
      await toast.promise(APIService.deleteTransaction(transactionId), {
        pending: "Deletando transação...",
        success: "Transação deletada com sucesso!",
        error: "Erro ao deletar transação!",
      });
    } catch (error) {
      console.error("Erro ao deletar transação", error);
    }
  };

  const {
    categories,
    fetchCategories,
    transactions,
    fetchTransactions,
    fetchDashboard,
  } = useFetchAPI();

  const transactionFilterForm = useForm<TransactionsFilterData>({
    defaultValues: {
      title: "",
      categoryId: "",
      startDate: dayjs().startOf("month").format("DD/MM/YYYY"),
      endDate: dayjs().endOf("month").format("DD/MM/YYYY"),
    },
    resolver: zodResolver(transactionsFilterSchema),
  });

  useEffect(() => {
    if (activeSection === "categories") {
      fetchCategories();
    } else if (activeSection === "transactions") {
      fetchTransactions(transactionFilterForm.getValues());
    }
  }, [
    activeSection,
    fetchCategories,
    fetchTransactions,
    transactionFilterForm,
  ]);

  const onSubmitDashboard = useCallback(
    async (data: TransactionsFilterData) => {
      const { startDate, endDate } = data;
      await fetchDashboard({ startDate, endDate });
      await fetchTransactions(data);
    },
    [fetchDashboard, fetchTransactions]
  );

  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarHeader>
          <h1>Gerenciamento</h1>
        </SidebarHeader>
        <SidebarNav>
          {[
            { id: "categories", label: "Categories" },
            { id: "transactions", label: "Transactions" },
          ].map((item) => (
            <SidebarButton
              key={item.id}
              $isActive={activeSection === item.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setActiveSection(item.id as any)}
            >
              {item.label}
            </SidebarButton>
          ))}
        </SidebarNav>
      </Sidebar>
      <MainContent>
        <Header>
          <h2>Categories</h2>
          {activeSection === "transactions" && (
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
          )}
          <div>
            <ViewModeButton
              $isActive={viewMode === "grid"}
              onClick={() => setViewMode("grid")}
            >
              <SquaresFour size={24} />
            </ViewModeButton>
            <ViewModeButton
              $isActive={viewMode === "list"}
              onClick={() => setViewMode("list")}
            >
              <List size={24} />
            </ViewModeButton>
          </div>
        </Header>
        <ContentContainer $viewMode={viewMode}>
          {activeSection === "categories"
            ? categories.map((category) => (
                <Card key={category._id} $viewMode={viewMode}>
                  <CardContent>
                    <h3>{category.title}</h3>
                  </CardContent>
                  <ActionsContainer>
                    <button>
                      <NotePencil size={24} />
                    </button>
                    <button className="delete">
                      <Trash size={24} />
                    </button>
                  </ActionsContainer>
                </Card>
              ))
            : transactions.map((transaction) => (
                <Card
                  key={transaction._id}
                  $viewMode={viewMode}
                  $isSingle={transactions?.length === 1}
                >
                  <CardContent>
                    <h3>{transaction.title}</h3>
                    <p>{transaction.category.title}</p>
                    <p>{dayjs(transaction.date).format("DD/MM/YYYY")}</p>
                    <p>{formatCurrency(transaction.amount)}</p>
                  </CardContent>
                  <ActionsContainer>
                    <button onClick={() => handleOpen(transaction)}>
                      <NotePencil size={24} />
                    </button>
                    <button onClick={() => handleDelete(transaction._id)}>
                      <Trash size={24} />
                    </button>
                  </ActionsContainer>
                </Card>
              ))}
          <Dialog open={openDialog} onClose={handleClose}>
            <EditDialog
              handleClose={handleClose}
              title={selectedTransaction?.title}
              amount={selectedTransaction?.amount}
              category={selectedTransaction?.category}
              transactionId={selectedTransaction?._id}
              showDeleteButton={false}
            />
          </Dialog>
        </ContentContainer>
      </MainContent>
    </DashboardContainer>
  );
}
