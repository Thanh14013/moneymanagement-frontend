import React from 'react'
import { addThousandsSeparator } from '../util/util';

const FinanceOverview = (totalBalance, totalIncome,totalExpense) => {
  
  const COLORS = ["#59168B, #a0090e", "#016630"];

  const balanceData = [
    {name: "Total Balance", amount: totalBalance},
    {name: "Total Income", amount: totalIncome},
    {name: "Total Expense", amount: totalExpense}
  ]

  return (
    <div>
        <div className="bg-white shadow-md rounded-xl p-4">
          <div className="flex justify-between items-center ">
            <h5 className="text-lg">Financial Overview</h5>
          </div>

          <CustomPieChart 
            data={balanceData}
            label="Total Balance"
            totalAmount={`$${addThousandsSeparator(totalBalance)}`}
            colors={COLORS}
            showTextAnchor={true}
          />
        </div>
    </div>
  )
}

export default FinanceOverview