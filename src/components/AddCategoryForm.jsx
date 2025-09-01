import React, { useState } from 'react'
import Input from './Input';
import EmojiPickerPopup from './EmojiPickerPopup';
const AddCategoryForm = () => {

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
        </div>

    )
}

export default AddCategoryForm