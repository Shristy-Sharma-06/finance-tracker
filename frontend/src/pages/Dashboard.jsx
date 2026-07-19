import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import MonthlyBarChart from "../components/MonthlyBarChart";
import ExpensePieChart from "../components/ExpensePieChart";

import {
    getDashboard,
    getMonthlyTrends,
    getCategoryExpense
} from "../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState({});

    const [monthlyData, setMonthlyData] = useState([]);

    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const dashboardRes = await getDashboard();

            const monthlyRes = await getMonthlyTrends();

            const categoryRes = await getCategoryExpense();

            setDashboard(dashboardRes.data);

            setMonthlyData(monthlyRes.data);

            setCategoryData(categoryRes.data);

        } catch (error) {

            toast.error("Failed to load dashboard");

        }

    };

    return (
        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <main className="flex-grow-1 p-3">

                    <h2 className="fw-bold">
                        Welcome 👋
                    </h2>

                    <p className="text-muted">
                        Track your income, expenses and savings in one place.
                    </p>

                    <div className="row">

                        <DashboardCard
                            title="Total Income"
                            value={`₹ ${dashboard.totalIncome ?? 0}`}
                            color="success"
                        />

                        <DashboardCard
                            title="Total Expense"
                            value={`₹ ${dashboard.totalExpense ?? 0}`}
                            color="danger"
                        />

                        <DashboardCard
                            title="Savings"
                            value={`₹ ${dashboard.savings ?? 0}`}
                            color="primary"
                        />

                        <DashboardCard
                            title="Monthly Budget"
                            value={`₹ ${dashboard.monthlyBudget ?? 0}`}
                            color="warning"
                        />

                        <DashboardCard
                            title="Remaining Budget"
                            value={`₹ ${dashboard.remainingBudget ?? 0}`}
                            color="info"
                        />

                        <DashboardCard
                            title="Transactions"
                            value={dashboard.totalTransactions ?? 0}
                            color="secondary"
                        />

                    </div>

                    <div className="row mt-4">

                        <div className="col-lg-6 mb-4">

                            <div className="card shadow">

                                <div className="card-body">

                                    <MonthlyBarChart
                                        data={monthlyData}
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="col-lg-6 mb-4">

                            <div className="card shadow">

                                <div className="card-body">

                                    <ExpensePieChart
                                        data={categoryData}
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </>
    );

}

export default Dashboard;