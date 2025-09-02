import React, { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hook/useUser'
import axiosConfig from '../util/AxiosConfig';
import { API_ENDPONT } from '../util/apiEnpoint';
import toast from 'react-hot-toast';
import IncomeList from '../components/IncomeList';
import Modal from '../components/Modal';
import { Plus } from 'lucide-react';
import AddIncomeForm from '../components/AddIncomeForm';

const Income = () => {
  useUser();

  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const respond = await axiosConfig.get(API_ENDPONT.GET_ALL_INCOMES);
      if (respond.data) {
        setIncomeData(respond.data);
        console.log(respond.data);
      }
    } catch (error) {
      console.error("Error fetching income details:", error);
      toast.error("Failed to fetch income details");
    } finally {
      setLoading(false);
    }
  }

  const fetchIncomeCategories = async () => {
    try {
      const respond = await axiosConfig.get(API_ENDPONT.CATEGORY_BY_TYPE("income"))
      if (respond.data) {
        setCategories(respond.data);
        console.log("Income Categories:", respond.data);
        console.log(respond.data);
      }
    } catch (error) {
      console.error("Error fetching income categories:", error);
      toast.error("Failed to fetch income categories");
    }
  }

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  return (
    <div>
      <Dashboard activeMenu="Income">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div>
              {/* overview for income with inline chart */}
              <button className="flex items-center gap-1 bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={() => setOpenAddIncomeModal(true)}>
                <Plus size={15} className="text-lg" /> Add Income
              </button>
              <br />
              <IncomeList transactions={incomeData} onDelete={(id) => console.log(id)} />

              <Modal
                isOpen={openAddIncomeModal}
                onClose={() => setOpenAddIncomeModal(false)}
                title="Add Income"
              >
                <AddIncomeForm onAddIncome={() => console.log("Income added")} categories={categories} />
              </Modal>

            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  )
}

export default Income