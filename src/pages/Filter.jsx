import React, { use, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hook/useUser'
import { Search } from 'lucide-react';
import axiosConfig from '../util/AxiosConfig';
import { API_ENDPONT } from '../util/apiEnpoint';
import toast from 'react-hot-toast';
import moment from 'moment'
import TransactionInfoCard from '../components/TransactionInfoCard';

const Filter = () => {
  useUser();

  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const respond = await axiosConfig.post(API_ENDPONT.APPLY_FILTER, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder
      });
      if (respond.data) {
        setTransactions(respond.data);
        toast.success("Filtered transactions fetched successfully");
        console.log(respond.data);
      }
    } catch (error) {
      console.error("Error fetching filtered transactions:", error);
      toast.error("Failed to fetch filtered transactions");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Dashboard activeMenu="Filters">
        <div className="my-5 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Filter Transactions</h2>
          </div>
          <div className=" justify-between items-center bg-white shadow-md rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-lg font-semibold">Select the filters</h5>
            </div>
            <form className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[120px]">
                <label className="block text-sm font-medium mb-1" htmlFor="type">Type</label>
                <select onChange={(e) => setType(e.target.value)} value={type} id="type" className="w-full border rounded px-3 py-2">
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div className="flex-1 min-w-[120px]">
                <label htmlFor="startdate" className="block text-sm font-medium mb-1">Start Date</label>
                <input onChange={(e) => setStartDate(e.target.value)} value={startDate} id="startdate" type="date" className="w-full border rounded px-3 py-2" />
              </div>

              <div className="flex-1 min-w-[120px]">
                <label htmlFor="enddate" className="block text-sm font-medium mb-1">End Date</label>
                <input onChange={(e) => setEndDate(e.target.value)} value={endDate} id="enddate" type="date" className="w-full border rounded px-3 py-2" />
              </div>

              <div className="flex-1 min-w-[120px]">
                <label htmlFor="sortfield" className="block text-sm font-medium mb-1">Sort Field</label>
                <select onChange={(e) => setSortField(e.target.value)} value={sortField} id="sortfield" className="w-full border rounded px-3 py-2">
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="category">Category</option>
                </select>
              </div>
              <div className="flex-1 min-w-[120px]">
                <label htmlFor="sortorder" className="block text-sm font-medium mb-1">Sort Order</label>
                <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder} id="sortorder" className="w-full border rounded px-3 py-2">
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>

              <div className="flex-1 min-w-[180px] flex items-end">
                <div className="flex-grow">
                  <label htmlFor="keyword" className="block text-sm font-medium mb-1">Search</label>
                  <input onChange={(e) => setKeyword(e.target.value)} value={keyword} id="keyword" type="text" placeholder="Search ... " className="w-full border rounded px-3 py-2" />
                </div>
                <button onClick={handleSearch} className="ml-2 p-2 bg-purple-800 hover:bg-purple-800 text-white rounded flex items-center justify-center cursor-pointer">
                  <Search size={25} />
                </button>
              </div>
            </form>

          </div>
          <br />
          <div className="grid grid-cols-1 bg-white shadow-md rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Transactions</h2>
            </div>
            {transactions.length === 0 && !loading ? (
              <p className="text-gray-500">Select the filters and click apply</p>
            ) : (
              ''
            )}
            {transactions.map((transaction) => (
              <TransactionInfoCard
                key={transaction.id}
                title={transaction.name}
                icon={transaction.icon}
                date={moment(transaction.date).format('Do MMM YYYY')}
                amount={transaction.amount}
                type={type}
                hideDeleteBtn={true}
              />
            ))}
          </div>

        </div>
      </Dashboard>
    </div>
  )
}

export default Filter