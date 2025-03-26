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
import { useUser } from "@/lib/action/user-context"


const Chart = () => {
  const {categoryExpense} = useTransaction()
  const {user} = useUser()
  const chartData = [
    { browser: "entertaiment", amount: user ? categoryExpense.entertaiment : 275, fill: "var(--color-entertaiment)" },
    { browser: "food", amount: user ? categoryExpense.food : 200, fill: "var(--color-food)" },
    { browser: "rent", amount: user ? categoryExpense.rent : 187, fill: "var(--color-rent)" },
    { browser: "study", amount: user ? categoryExpense.study : 173, fill: "var(--color-study)" },
    { browser: "clothes", amount: user ? categoryExpense.clothes : 90, fill: "var(--color-clothes)" },
  ]
  
  const chartConfig = {
    amount: {
      label: "Amount",
    },
    entertaiment: {
      label: "Entertainment",
      color: "var(--chart-1)",
    },
    food: {
      label: "Food",
      color: "var(--chart-2)",
    },
    rent: {
      label: "Rent",
      color: "var(--chart-3)",
    },
    study: {
      label: "Study",
      color: "var(--chart-4)",
    },
    clothes: {
      label: "Clothes",
      color: "var(--chart-5)",
    },
  }
  return (
    <div className="shadow-md rounded-xl">
        <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense</CardTitle>
        <CardDescription>This month</CardDescription>
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
        {!categoryExpense ? (
          <p className="text-muted text-center">You don't have income or expense to show</p>
        ): null}
        <div className="flex items-center gap-2 font-medium leading-none">
          Expense chart based on Category <TrendingUp className="h-4 w-4 max-lg:hidden" />
        </div>
        <div className="leading-none text-muted-foreground text-center max-lg:text-start">
          Showing total expense for each category
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Chart