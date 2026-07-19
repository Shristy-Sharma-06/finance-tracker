import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TransactionTable from "../components/TransactionTable";
import TransactionForm from "../components/TransactionForm.jsx";

import {
    getTransactions,
    deleteTransaction
} from "../services/transactionService.js";

function Transactions() {

    const [transactions, setTransactions] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [editTransaction, setEditTransaction] = useState(null);

    useEffect(() => {

        loadTransactions();

    }, []);

    const loadTransactions = async () => {

        try {

            const response = await getTransactions();

            setTransactions(response.data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load transactions"
            );

        }

    };

    const handleAdd = () => {

        setEditTransaction(null);

        setShowModal(true);

    };

    const handleEdit = (transaction) => {

        setEditTransaction(transaction);

        setShowModal(true);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this transaction?")) {

            return;

        }

        try {

            await deleteTransaction(id);

            toast.success("Transaction Deleted");

            loadTransactions();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };

    const handleClose = () => {

        setShowModal(false);

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

                            <h2>Transactions</h2>

                            <button
                                className="btn btn-primary"
                                onClick={handleAdd}
                            >

                                + Add Transaction

                            </button>

                        </div>

                        <TransactionTable
                            transactions={transactions}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />

                    </div>

                </div>

            </div>

            <TransactionForm
                show={showModal}
                handleClose={handleClose}
                loadTransactions={loadTransactions}
                editTransaction={editTransaction}
            />

        </>

    );

}

export default Transactions;