"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { useState } from "react"
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

const Analysis = () => {
  const chartData = [
    { month: "January", income: 186, expense: 80 },
    { month: "February", income: 305, expense: 200 },
    { month: "March", income: 237, expense: 120 },
    { month: "April", income: 73, expense: 190 },
    { month: "May", income: 209, expense: 130 },
    { month: "June", income: 214, expense: 140 },
  ]
  
  const chartConfig = {
    income: {
      label: "Income",
      color: "var(--chart-1)",
    },
    expense: {
      label: "Expense",
      color: "var(--chart-2)",
    },
  }
  return (
    <div className="my-2">
      <Card>
        <CardHeader>
          <CardTitle>Analysis</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
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