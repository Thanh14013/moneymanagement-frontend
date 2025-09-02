import moment from 'moment';
import React, {useState, useEffect, useCallback} from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import CustomAmount from './CustomAmount';
import axiosConfig from '../util/AxiosConfig';
import { API_ENDPONT } from '../util/apiEnpoint';

const IncomeOverview = ({ transactions }) => {

    const [chartData, setChartData] = useState([]);
    const [categories, setCategories] = useState([]);
    
    // Helper function to process data
    const processTransactionData = useCallback((transactions, categoryList) => {
        // Create a map of categoryId to category name for quick lookups
        const categoryMap = {};
        if (categoryList && categoryList.length) {
            categoryList.forEach(cat => {
                if (cat.id) {
                    categoryMap[cat.id] = cat.name;
                }
            });
        }
        
        // Group transactions by date
        const groupedByDate = transactions.reduce((acc, tx) => {
            if (!tx.date) return acc;
            
            const dateKey = moment(tx.date).format('YYYY-MM-DD');
            if (!acc[dateKey]) {
                acc[dateKey] = {
                    date: tx.date,
                    totalAmount: 0,
                    displayDate: moment(tx.date).format("Do MMM"), // Format like "6th Jul"
                    formattedDate: moment(tx.date).format("Do MMM"), // For tooltip
                    categoryDetails: {} // To track amounts by category
                };
            }
            
            // Add transaction amount to total
            const amount = Number(tx.amount) || 0;
            acc[dateKey].totalAmount += amount;
            
            // Find the category name
            let categoryName = 'Other';
            
            // First check if we have a mapping for this categoryId
            if (tx.categoryId && categoryMap[tx.categoryId]) {
                categoryName = categoryMap[tx.categoryId];
            }
            // Then check if there's a direct category.name
            else if (tx.category && tx.category.name) {
                categoryName = tx.category.name;
            }
            // Then check if there's a categoryName property
            else if (tx.categoryName) {
                categoryName = tx.categoryName;
            }
            // Last resort, use the income name itself
            else if (tx.name) {
                categoryName = tx.name;
            }
            
            if (!acc[dateKey].categoryDetails[categoryName]) {
                acc[dateKey].categoryDetails[categoryName] = 0;
            }
            acc[dateKey].categoryDetails[categoryName] += amount;
            
            return acc;
        }, {});
        
        // Convert the grouped data into array format for chart
        const formattedData = Object.values(groupedByDate).map(item => ({
            ...item,
            // Convert category details to array format for easier rendering
            categories: Object.entries(item.categoryDetails)
                .map(([name, amount]) => ({
                    name,
                    amount
                }))
                .sort((a, b) => b.amount - a.amount) // Sort by amount in descending order
        }));
        
        // Sort data by date to ensure proper display
        formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        return formattedData;
    }, []);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosConfig.get(API_ENDPONT.CATEGORY_BY_TYPE("income"));
                if (response.data) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        
        fetchCategories();
    }, []);
    
    useEffect(() => {
        if (!transactions || transactions.length === 0) {
            setChartData([]);
            return;
        }
        
        // Log the first transaction to understand its structure
        if (transactions.length > 0) {
            console.log("First transaction structure:", transactions[0]);
        }
        
        const formattedData = processTransactionData(transactions, categories);
        console.log("Formatted chart data:", formattedData);
        setChartData(formattedData);
    }, [transactions, categories, processTransactionData]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">
                        Income Overview
                    </h5>
                    <p className="text-xs text-gray-400 mt-0 5">
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>
            </div>

            <div className="mt-10">
                {/* Chart for income overview */}
                <CustomAmount data={chartData} />
            </div>
        </div>

    )
}

export default IncomeOverview