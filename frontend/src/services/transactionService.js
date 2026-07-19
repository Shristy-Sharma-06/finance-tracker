import api from "../api/axiosConfig.js";

export const getTransactions = async () => {
    return await api.get("/transactions");
};

export const addTransaction = async (transaction) => {
    return await api.post("/transactions", transaction);
};

export const updateTransaction = async (id, transaction) => {
    return await api.put(`/transactions/${id}`, transaction);
};

export const deleteTransaction = async (id) => {
    return await api.delete(`/transactions/${id}`);
};