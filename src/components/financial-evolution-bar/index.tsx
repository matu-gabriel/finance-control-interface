import { ResponsiveBar } from "@nivo/bar";
import { useMemo } from "react";
import dayjs from "dayjs";
import ptBRLocale from "dayjs/locale/pt-br";
import { theme } from "../../styles/theme";
import { formatCurrency } from "../../utils/formatCurrency";
import { FinanceEvolution } from "../../services/api-types";

dayjs.locale(ptBRLocale);

type ChartData = {
  month: string;
  Saldo: number;
  Receitas: number;
  Despesas: number;
};

type FinanceEolutionChartProps = {
  financeEvolution?: FinanceEvolution[];
};

export function FinancialEvolutionBar({
  financeEvolution,
}: FinanceEolutionChartProps) {
  const data = useMemo<ChartData[]>(() => {
    if (financeEvolution?.length) {
      const chatData: ChartData[] = financeEvolution.map((item) => {
        const [year, month] = item._id;
        return {
          month: dayjs(`${year}-${month}-01`).format("MMM"),
          Saldo: item.balanço,
          Receitas: item.receita,
          Despesas: item.despesa,
        };
      });

      return chatData;
    }
    return [];
  }, [financeEvolution]);

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
