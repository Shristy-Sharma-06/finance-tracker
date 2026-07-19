import api from "../api/axiosConfig.js";

export const getBudgets = async () => {
    return await api.get("/budgets");
};

export const addBudget = async (budget) => {
    return await api.post("/budgets", budget);
};

export const updateBudget = async (id, budget) => {
    return await api.put(`/budgets/${id}`, budget);
};

export const deleteBudget = async (id) => {
    return await api.delete(`/budgets/${id}`);
};