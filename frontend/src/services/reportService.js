import api from "../api/axiosConfig";

export const getMonthlyReport = (month, year) => {
    return api.get(`/reports/monthly?month=${month}&year=${year}`);
};

export const getAnnualReport = (year) => {
    return api.get(`/reports/annual?year=${year}`);
};

export const getCategoryReport = () => {
    return api.get("/reports/category-wise");
};

export const downloadPdf = (month, year) => {
    return api.get(
        `/reports/export/pdf?month=${month}&year=${year}`,
        {
            responseType: "blob",
        }
    );
};

export const downloadCsv = (month, year) => {
    return api.get(
        `/reports/export/csv?month=${month}&year=${year}`,
        {
            responseType: "blob",
        }
    );
};