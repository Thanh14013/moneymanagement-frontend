import { ArrowRight } from "lucide-react"
import TransactionInfoCard from "./TransactionInfoCard"
import moment from "moment"

const Transactions = ({transactions, onMore, type, title}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{title}</h5>
        <button className="flex items-center justify-between rounded-lg bg-gray-200 text-gray-600 px-4 py-1" onClick={onMore}>
          More <ArrowRight className="text-base" size={15} />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
            <TransactionInfoCard 
                key={item.id}
                title={item.name}
                amount={item.amount}
                date={moment(item.date).format("MMM D, YYYY")}
                icon={item.icon}
                type={type}
                hideDeleteBtn={true}
            />
        ))}
      </div>
    </div>
  )
}

export default Transactions
