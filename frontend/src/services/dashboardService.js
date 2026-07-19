import api from "../api/axiosConfig.js";

export const getDashboard = () => {
    return api.get("/dashboard");
};

export const getMonthlyTrends = () => {
    return api.get("/dashboard/monthly-trends");
};

export const getCategoryExpense = () => {
    return api.get("/dashboard/category-expense");
};