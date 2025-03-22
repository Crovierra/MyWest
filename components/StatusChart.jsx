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
const chartData = [
  { browser: "income", amount: 275, fill: "var(--color-income)" },
  { browser: "expense", amount: 200, fill: "var(--color-expense)" },
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

const StatusChart = () => {
  return (
    <div>
        <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
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
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Expense chart based on Category <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground text-center">
          Showing total expense for each category
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}

export default StatusChart