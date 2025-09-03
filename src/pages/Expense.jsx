import React, { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hook/useUser'
import axiosConfig from '../util/AxiosConfig';
import { API_ENDPONT } from '../util/apiEnpoint';
import toast from 'react-hot-toast';
import ExpenseList from '../components/ExpenseList';
import Modal from '../components/Modal';
import { Plus } from 'lucide-react';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseOverview from '../components/ExpenseOverview';

const Expense = () => {
  useUser();

  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);


  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const respond = await axiosConfig.get(API_ENDPONT.GET_ALL_EXPENSES);
      if (respond.data) {
        setExpenseData(respond.data);
      }
    } catch (error) {
      console.error("Error fetching expense details:", error);
      toast.error("Failed to fetch expense details");
    } finally {
      setLoading(false);
    }
  }

  const fetchExpenseCategories = async () => {
    try {
      const respond = await axiosConfig.get(API_ENDPONT.CATEGORY_BY_TYPE("expense"))
      if (respond.data) {
        setCategories(respond.data);
      }
    } catch (error) {
      console.error("Error fetching expense categories:", error);
      toast.error("Failed to fetch expense categories");
    }
  }

  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense;

    //validation
    if (!name || !amount || !date || !icon || !categoryId || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Error, Try again");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPONT.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId
      });
      if (response.data) {
        setOpenAddExpenseModal(false);
        fetchExpenseDetails();
        fetchExpenseCategories();
        toast.success("Expense added successfully");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense");
    }
  }

  const deleteExpense = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPONT.DELETE_EXPENSE(id));
      fetchExpenseDetails();
      toast.success("Expense deleted successfully");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense");
    }
  }

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  return (
    <div>
      <Dashboard activeMenu="Expense">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div>
              {/* overview for expense with inline chart */}
              <button className="flex items-center gap-1 bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={() => setOpenAddExpenseModal(true)}>
                <Plus size={15} className="text-lg" /> Add Expense
              </button>
              <ExpenseOverview transactions={expenseData}/>
              <br />
              <ExpenseList transactions={expenseData} onDelete={(id) => deleteExpense(id)} />

              <Modal
                isOpen={openAddExpenseModal}
                onClose={() => setOpenAddExpenseModal(false)}
                title="Add Expense"
              >
                <AddExpenseForm onAddExpense={(expense) => handleAddExpense(expense)} categories={categories} />
              </Modal>

            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  )
}

export default Expense
