import { ResponsiveBar } from "@nivo/bar";
import { useMemo } from "react";
import dayjs from "dayjs";
import ptBRLocale from "dayjs/locale/pt-br";
import { theme } from "../../styles/theme";
import { formatCurrency } from "../../utils/formatCurrency";

dayjs.locale(ptBRLocale);

const apiData = [
  {
    _id: {
      year: 2024,
      month: 1,
    },
    balance: 68900,
    receita: 36623,
    despesas: 25242,
  },
  {
    _id: {
      year: 2024,
      month: 2,
    },
    balance: 68900,
    receita: 36623,
    despesas: 25242,
  },
  {
    _id: {
      year: 2024,
      month: 3,
    },
    balance: 68900,
    receita: 36623,
    despesas: 25242,
  },
  {
    _id: {
      year: 2024,
      month: 4,
    },
    balance: 68900,
    receita: 36623,
    despesas: 25242,
  },
];

type ChartData = {
  month: string;
  Saldo: number;
  Receitas: number;
  Despesas: number;
};

export function FinancialEvolutionBar() {
  const data = useMemo<ChartData[]>(() => {
    const chatData: ChartData[] = apiData.map((item) => ({
      month: dayjs(`${item._id.year}-${item._id.month}-01`).format("MMM"),
      Saldo: item.balance,
      Receitas: item.receita,
      Despesas: item.despesas,
    }));

    return chatData;
  }, []);

  return (
    <ResponsiveBar
      data={data}
      keys={["Saldo", "Receitas", "Despesas"]}
      colors={[theme.colors.info, theme.colors.success, theme.colors.error]}
      indexBy={"month"}
      groupMode="grouped"
      enableLabel={false}
      enableGridY={false}
      padding={0.2}
      axisLeft={{
        tickSize: 0,
        format: formatCurrency,
      }}
      margin={{ left: 80, bottom: 28 }}
      theme={{
        text: {
          fontSize: 10,
        },
        axis: {
          ticks: {
            text: {
              fill: theme.colors.white,
            },
          },
        },
        tooltip: {
          container: {
            backgroundColor: theme.colors.black,
            padding: 16,
            color: theme.colors.white,
            fontSize: 12,
            borderRadius: 4,
          },
        },
      }}
      valueFormat={formatCurrency}
    />
  );
}
