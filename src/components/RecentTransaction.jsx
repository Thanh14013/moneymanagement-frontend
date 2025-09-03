import { ArrowRight } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const RecentTransaction = ({Transactions, onMore}) => {
  return (
    <div className='p-4 bg-white rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
      <div className="flex items-center justify-between">
        <h4 className="text-lg">Recent Transactions</h4>

        <button className="text-sm rounded-lg bg-gray-200 flex items-center px-4 py-1 cursor-pointer" onClick={onMore}>
          More <ArrowRight className='text-base' size={15} />
        </button>
      </div>

      <div className="mt-6">
        {Transactions?.slice(0,5).map((item) => (
          <TransactionInfoCard 
            key={item.id}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format("DD MMMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn={true}
          />
        ))}
      </div>
    </div>
  )
}

export default RecentTransaction