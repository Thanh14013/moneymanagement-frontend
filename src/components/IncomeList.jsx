import React from 'react'
import { Mail, Download } from 'lucide-react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const IncomeList = ({ transactions, onDelete }) => {
    return (
        <>
            <div className="flex justify-between items-center bg-white shadow-md rounded-xl p-4">
                <h2 className="text-lg font-medium text-gray-800">Income Sources</h2>
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
                {/* display the incomes */}
                {transactions.map((income) => (
                    <TransactionInfoCard key={income.id} title={income.name} amount={income.amount} date={moment(income.date).format('MMMM Do YYYY')} type="income" icon={income.icon} onDelete={() => onDelete(income.id)} />
                ))}
            </div>
        </>


    )
}

export default IncomeList