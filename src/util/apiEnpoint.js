export const BASE_URL = "http://localhost:8080/api/v1.0";
const CLOUDINARY_NAME = "dc4jg3br6"
export const API_ENDPONT ={
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO: "/profile",
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
    ADD_INCOME: "/incomes",
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    GET_ALL_INCOMES: "/incomes",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`
}