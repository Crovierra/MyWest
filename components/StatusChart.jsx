"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useTransaction } from "@/lib/action/transaction-context"

const StatusChart = () => {
  const {income, expense} = useTransaction()
  const chartData = [
    { browser: "income", amount: income ? income : 3680, fill: "var(--color-income)" },
    { browser: "expense", amount: expense ? expense : 2225, fill: "var(--color-expense)" },
  ]
  
  const chartConfig = {
    amount: {
      label: "Amount",
    },
    income: {
      label: "Income",
      color: "var(--chart-6)",
    },
    expense: {
      label: "Expense",
      color: "var(--chart-7)",
    },
  }
  return (
    <div className="rounded-xl shadow-md">
        <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Report</CardTitle>
        <CardDescription>This Month</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="browser"
              innerRadius="50%"
              outerRadius="80%"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Chart for your income and expenses<TrendingUp className="h-4 w-4 max-lg:hidden" />
        </div>
        <div className="leading-none text-muted-foreground text-center max-lg:text-start">
          Showing money circulation for this month
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}

export default StatusChart