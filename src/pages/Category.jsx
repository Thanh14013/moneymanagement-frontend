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

  const handleAddCategory = async (category) => {
    const {name, type, icon} = category;

    if(!name.trim()){
      toast.error("Category name is required");
      return;
    }
    //check if category already exists
    if (categoryData.some((cat) => cat.name === name)) {
      toast.error("Category already exists");
      return;
    }
    try {
      const response = await axiosConfig.post(API_ENDPONT.ADD_CATEGORY, {
        name,
        type,
        icon
      });
      if (response.data) {
        toast.success("Category added successfully");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }
      else if (response.status === 400 || response.status === 403 || response.status === 500)
        toast.error("Failed to add category");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    }
  }

  const handleEditCategory = (category) => {
    console.log("Edit category clicked", category);
  }

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
        <CategoryList categories={categoryData} onEditCategory={handleEditCategory} />

        {/* adding category modal */}
          <Modal isOpen={openAddCategoryModal} onClose={() => setOpenAddCategoryModal(false)} title="Add Category">
            <AddCategoryForm onAddCategory={handleAddCategory} />
          </Modal>
        {/* updating category modal */}
      </div>
    </Dashboard>
  )
}

export default Category