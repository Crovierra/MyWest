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
  { browser: "entertaiment", amount: 275, fill: "var(--color-entertaiment)" },
  { browser: "food", amount: 200, fill: "var(--color-food)" },
  { browser: "rent", amount: 187, fill: "var(--color-rent)" },
  { browser: "study", amount: 173, fill: "var(--color-study)" },
  { browser: "clothes", amount: 90, fill: "var(--color-clothes)" },
]

const chartConfig = {
  amount: {
    label: "Amount",
  },
  entertaiment: {
    label: "Entertaiment",
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


const Chart = () => {
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