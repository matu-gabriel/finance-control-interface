import { useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { Container, Content, Info } from "./style";
import { Dialog } from "@mui/material";
import { EditDialog } from "../edit-dialog";

type TransactionProps = {
  id: string;
  orderNumber: number;
  title: string;
  date: string;
  amount: number;
  category: {
    _id: string;
    title: string;
    color: string;
  };
  variant?: "receita" | "despesa";
};

export function Transaction({
  id,
  orderNumber,
  title,
  date,
  amount,
  category,
  variant = "receita",
}: TransactionProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Container onClick={handleOpen}>
        <Info>
          <span>#{orderNumber.toString().padStart(4, "0")}</span>
          <div>
            <strong>{title}</strong>
            <span>{date}</span>
          </div>
        </Info>

        <Content $variant={variant} $tagColor={category.color}>
          <strong>{formatCurrency(amount)}</strong>
          <span>{category.title?.toUpperCase()}</span>
        </Content>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <EditDialog
          handleClose={handleClose}
          transactionId={id}
          title={title}
          amount={amount}
          category={{
            _id: category._id,
            title: category.title,
            color: category.color,
          }}
        />
      </Dialog>
    </>
  );
}
