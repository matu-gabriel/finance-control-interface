export function formatCurrency(value: number) {
  if (typeof value !== "number") return "";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
}
