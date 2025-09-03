import React from 'react'
import { Mail, Download } from 'lucide-react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const ExpenseList = ({ transactions, onDelete }) => {
    return (
        <>
            <div className="flex justify-between items-center bg-white shadow-md rounded-xl p-4">
                <h2 className="text-lg font-medium text-gray-800">Expense Sources</h2>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:text-purple-600 transition-colors duration-200 hover:bg-purple-600 hover:text-white">
                        <Mail size={15} />
                        <span>Email</span>
                    </button>
                    <button className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-purple-600 hover:text-white transition-colors duration-200">
                        <Download size={15} />
                        <span>Download</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* display the expenses */}
                {transactions.map((expense) => (
                    <TransactionInfoCard key={expense.id} title={expense.name} amount={expense.amount} date={moment(expense.date).format('MMMM Do YYYY')} type="expense" icon={expense.icon} onDelete={() => onDelete(expense.id)} />
                ))}
            </div>
        </>
    )
}

export default ExpenseList
