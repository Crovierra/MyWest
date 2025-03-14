import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const TransactionTable = () => {
  const income = "bg-green-500 rounded-2xl pb-0.5 px-4 text-white"
  const expense = "bg-red-500 rounded-2xl pb-0.5 px-4 text-white"
  const temporaryData = [{
    invoice: 1,
    date:"12/10/2025",
    status: "Income",
    desc: "Salary",
    category: "Salary",
    amount: 250
  },
  {
    invoice: 2,
    date:"15/10/2025",
    status: "Expense",
    desc: "Buying Mc Donalds",
    category: "Food",
    amount: 250
  },
  {
    invoice: 3,
    date:"16/10/2025",
    status: "Expense",
    desc: "Taking Bubu on a date",
    category: "Date",
    amount: 1050
  }]
  return (
    <div>
        <Table>
            <TableCaption className="mt-[5%]">A list of your recent invoices.</TableCaption>
            <TableHeader>
             <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead className="w-[10%]">Date</TableHead>
                <TableHead className="w-[10%]">Status</TableHead>
                <TableHead className="w-[10%]">Category</TableHead>
                <TableHead className="w-[70%]">Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
             <TableBody>
              {/* Map Data */}
              {temporaryData.map(item => {
                return (
                  <TableRow key={item.invoice}>
                  <TableCell className="font-medium">{item.invoice}</TableCell>
                 <TableCell>{item.date}</TableCell>
                  <TableCell><span className={item.status === "Income" ? income : expense}>{item.status}</span></TableCell>
                 <TableCell>{item.category}</TableCell>
                 <TableCell>{item.desc}</TableCell>
                  <TableCell className="text-right">$ {item.amount}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
        </Table>
    </div>
  )
}

export default TransactionTable