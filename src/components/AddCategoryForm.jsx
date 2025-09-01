import React, { useState } from 'react'
import Input from './Input';
import EmojiPickerPopup from './EmojiPickerPopup';
import { LoaderCircle } from 'lucide-react';
const AddCategoryForm = ({ onAddCategory }) => {

    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        name: "",
        type: "income",
        icon: ""
    });

    const categoryTypeOptions = [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" }
    ];

    const handleChange = ({ key, value }) => {
        setCategory((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onAddCategory(category);
        } catch (error) {
            console.error("Error adding category:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">

            <EmojiPickerPopup
                icon={category.icon}
                onSelect={(selectedIcon) => handleChange({ key: "icon", value: selectedIcon })}
            />

            <Input
                value={category.name}
                onChange={({ target }) => handleChange({ key: "name", value: target.value })}
                label="Category Name"
                placeholder="e.g., Freelance, Salary, Groceries"
                type="text"
            />

            <Input
                value={category.type}
                onChange={({ target }) => handleChange({ key: "type", value: target.value })}
                label="Category Type"
                options={categoryTypeOptions}
                isSelect={true}
            />

            <div className="flex justify-end mt-6">
                <button
                    disabled={loading}
                    type="button"
                    onClick={() => {
                        handleSubmit();
                    }}
                    className="add-btn add-btn-fill text-white bg-purple-700 px-3 py-1 rounded-lg"
                >
                    {loading? (
                        <>
                            <LoaderCircle className='w-4 h-4 animate-spin'/>
                            Adding...
                        </>
                    ):(<>
                        Add Category
                    </>)}
                </button>
            </div>

        </div>

    )
}

export default AddCategoryForm