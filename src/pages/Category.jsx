import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { Plus } from 'lucide-react'
import CategoryList from '../components/CategoryList'
import { useUser } from '../hook/useUser'
import axiosConfig from '../util/AxiosConfig'
import { API_ENDPONT } from '../util/apiEnpoint'
import toast from 'react-hot-toast'
import Modal from '../components/Modal'
import AddCategoryForm from '../components/AddCategoryForm'

const Category = () => {
  useUser();

  const [loading, setLoading] = useState (false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPONT.GET_ALL_CATEGORIES);
      if (response.data) {
        console.log("category data:", response.data);
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Error fetching category details:", error);
      toast.error("Failed to fetch category details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);


  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">

        {/* Add button to add category */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <button onClick={() => setOpenAddCategoryModal(true)} className="add-btn h-full text-green-500 bg-green-100 flex items-center gap-1 cursor-pointer px-3 py-1 rounded">
            <Plus size={15} />
            Add Category
          </button>
        </div>


        {/* category list */}
        <CategoryList categories={categoryData} />

        {/* adding category modal */}
          <Modal isOpen={openAddCategoryModal} onClose={() => setOpenAddCategoryModal(false)} title="Add Category">
            <AddCategoryForm />
          </Modal>
        {/* updating category modal */}
      </div>
    </Dashboard>
  )
}

export default Category