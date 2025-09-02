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
import IncomeOverview from '../components/IncomeOverview';

const Income = () => {
  useUser();

  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);


  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const respond = await axiosConfig.get(API_ENDPONT.GET_ALL_INCOMES);
      if (respond.data) {
        setIncomeData(respond.data);
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
      }
    } catch (error) {
      console.error("Error fetching income categories:", error);
      toast.error("Failed to fetch income categories");
    }
  }

  const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;

    //validation
    if (!name || !amount || !date || !icon || !categoryId || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Error, Try again");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPONT.ADD_INCOME, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId
      });
      if (response.data) {
        setOpenAddIncomeModal(false);
        fetchIncomeDetails();
        fetchIncomeCategories();
        toast.success("Income added successfully");
      }
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Failed to add income");
    }
  }

  const deleteIncome = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPONT.DELETE_INCOME(id));
      fetchIncomeDetails();
      toast.success("Income deleted successfully");
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Failed to delete income");
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
              <IncomeOverview transactions={incomeData}/>
              <br />
              <IncomeList transactions={incomeData} onDelete={(id) => deleteIncome(id)} />

              <Modal
                isOpen={openAddIncomeModal}
                onClose={() => setOpenAddIncomeModal(false)}
                title="Add Income"
              >
                <AddIncomeForm onAddIncome={(income) => handleAddIncome(income)} categories={categories} />
              </Modal>

            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  )
}

export default Income