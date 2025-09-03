import React from 'react'
import { addThousandsSeparator } from '../util/util';
import CustomPieChart from './CustomPieChart';

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  
  const COLORS = ["#59168B", "#016630" , "#a0090e"];

  const balanceData = [
    {name: "Total Balance", amount: totalBalance},
    {name: "Total Income", amount: totalIncome},
    {name: "Total Expense", amount: totalExpense}
  ]

  return (
    <div className='w-full h-full'>
        <div className="p-4 bg-white rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 h-full flex flex-col">
          <div className="flex justify-between items-center">
            <h4 className="text-lg">Financial Overview</h4>
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