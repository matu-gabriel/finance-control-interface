import { formatCurrency } from "../../utils/formatCurrency";
import { Container, Content, Info } from "./style";

type TransactionProps = {
  id: number;
  title: string;
  date: string;
  amount: number;
  category: {
    title: string;
    color: string;
  };
  variant?: "receita" | "despesa";
};

export function Transaction({
  id,
  title,
  date,
  amount,
  category,
  variant = "receita",
}: TransactionProps) {
  return (
    <Container>
      <Info>
        <span>#{id.toString().padStart(4, "0")}</span>
        <div>
          <strong>{title}</strong>
          <span>{date}</span>
        </div>
      </Info>

      <Content $variant={variant} $tagColor={category.color}>
        <strong>{formatCurrency(amount)}</strong>
        <span>{category.title.toUpperCase()}</span>
      </Content>
    </Container>
  );
}
