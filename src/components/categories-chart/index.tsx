import { ResponsivePie } from "@nivo/pie";
import { useMemo } from "react";
import { theme } from "../../styles/theme";
import { formatCurrency } from "../../utils/formatCurrency";
import { Expense } from "../../services/api-types";

export type CategoryProps = {
  id: string;
  title: string;
  color: string;
};

type ChartData = {
  id: string;
  label: string;
  externalId: string;
  value: number;
  color: string;
};

type CategoriesChartProps = {
  onClick: (category: CategoryProps) => void;
  despesa?: Expense[];
};

export function CategoriesChart({ onClick, despesa }: CategoriesChartProps) {
  const data = useMemo<ChartData[]>(() => {
    if (despesa?.length) {
      const chartData = despesa.map((item) => ({
        id: item.title,
        label: item.title,
        externalId: item._id,
        value: item.amount,
        color: item.color,
      }));
      return chartData;
    }
    return [];
  }, [despesa]);

  return (
    <ResponsivePie
      onClick={({ data }) =>
        onClick({
          id: data.externalId,
          title: data.id,
          color: data.color,
        })
      }
      data={data}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      colors={({ data }) => data.color}
      margin={{ top: 20 }}
      valueFormat={formatCurrency}
      theme={{
        text: {
          fontSize: 10,
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
      legends={[
        {
          anchor: "top",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: -20,
          itemWidth: 120,
          itemHeight: 16,
          itemTextColor: theme.colors.light,
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 10,
          symbolShape: "circle",
        },
      ]}
    />
  );
}
