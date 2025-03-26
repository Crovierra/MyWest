"use client"


import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { useState, useEffect } from "react"
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

const Analysis = () => {
  const { income, expense } = useTransaction()
  const [transaction, setTransaction] = useState({
    income: 0,
    expense: 0
  })

  const currentYear = new Date().getFullYear()
  
  useEffect(()=>{
    setTransaction({
      income: income,
      expense: expense
    })
  }, [income, expense])
  const chartData = [
    { month: "January", income: income ? 0 : 186, expense: expense ? 0 : 80 },
    { month: "February", income: income ? 0 : 305, expense: expense ? 0 : 200 },
    { month: "March", income: transaction.income || 237, expense: transaction.expense || 120 },
    { month: "April", income: income ? 0 : 73, expense: expense ? 0 : 190 },
    { month: "May", income: income ? 0 : 209, expense: expense ? 0 : 130 },
    { month: "June", income: income ? 0 : 214, expense: expense ? 0 : 140 },
  ]
  
  
  const chartConfig = {
    income: {
      label: "Income",
      color: "var(--chart-2)",
    },
    expense: {
      label: "Expense",
      color: "var(--chart-1)",
    },
  }
  return (
    <div className="my-2 shadow-lg rounded-xl">
      <Card>
        <CardHeader>
          <CardTitle>Analysis</CardTitle>
          <CardDescription>January - June {currentYear}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="income"
                type="monotone"
                stroke="var(--color-income)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="expense"
                type="monotone"
                stroke="var(--color-expense)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                Showing total Income or Expense for the last 6 months
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Analysis