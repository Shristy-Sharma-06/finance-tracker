import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BudgetTable from "../components/BudgetTable";
import BudgetForm from "../components/BudgetForm";

import {
    getBudgets,
    deleteBudget
} from "../services/budgetService";

function Budget() {

    const [budgets, setBudgets] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [editBudget, setEditBudget] = useState(null);

    useEffect(() => {
        loadBudgets();
    }, []);

    const loadBudgets = async () => {

        try {

            const response = await getBudgets();

            setBudgets(response.data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load budgets"
            );

        }

    };

    const handleAdd = () => {

        setEditBudget(null);

        setShowModal(true);

    };

    const handleEdit = (budget) => {

        setEditBudget(budget);

        setShowModal(true);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this budget?")) {
            return;
        }

        try {

            await deleteBudget(id);

            toast.success("Budget Deleted");

            loadBudgets();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };

    return (

        <>

            <Navbar />

            <div className="container-fluid">

                <div className="row">

                    <div className="col-md-2 p-0">
                        <Sidebar />
                    </div>

                    <div className="col-md-10 p-4">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <h2>Budgets</h2>

                            <button
                                className="btn btn-primary"
                                onClick={handleAdd}
                            >
                                + Add Budget
                            </button>

                        </div>

                        <BudgetTable
                            budgets={budgets}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />

                    </div>

                </div>

            </div>

            <BudgetForm
                show={showModal}
                handleClose={() => setShowModal(false)}
                loadBudgets={loadBudgets}
                editBudget={editBudget}
            />

        </>

    );

}

export default Budget;