import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addTransaction, updateTransaction } from "../services/transactionService";

function TransactionForm({
                             show,
                             handleClose,
                             loadTransactions,
                             editTransaction
                         }) {

    const initialState = {
        amount: "",
        transactionType: "EXPENSE",
        category: "FOOD",
        description: "",
        date: ""
    };

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {

        if (editTransaction) {

            setFormData({
                amount: editTransaction.amount,
                transactionType: editTransaction.transactionType,
                category: editTransaction.category,
                description: editTransaction.description,
                date: editTransaction.date
            });

        } else {

            setFormData(initialState);

        }

    }, [editTransaction, show]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editTransaction) {

                await updateTransaction(
                    editTransaction.id,
                    formData
                );

                toast.success("Transaction Updated");

            } else {

                await addTransaction(formData);

                toast.success("Transaction Added");

            }

            loadTransactions();

            handleClose();

            setFormData(initialState);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Operation Failed"
            );

        }

    };

    if (!show) return null;

    return (

        <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,.5)" }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>

                            {
                                editTransaction
                                    ? "Edit Transaction"
                                    : "Add Transaction"
                            }

                        </h5>

                        <button
                            className="btn-close"
                            onClick={handleClose}
                        ></button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <div className="mb-3">

                                <label>Amount</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>Transaction Type</label>

                                <select
                                    className="form-select"
                                    name="transactionType"
                                    value={formData.transactionType}
                                    onChange={handleChange}
                                >

                                    <option value="INCOME">
                                        Income
                                    </option>

                                    <option value="EXPENSE">
                                        Expense
                                    </option>

                                </select>

                            </div>

                            <div className="mb-3">

                                <label>Category</label>

                                <select
                                    className="form-select"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >

                                    <option value="SALARY">Salary</option>
                                    <option value="FOOD">Food</option>
                                    <option value="TRAVEL">Travel</option>
                                    <option value="SHOPPING">Shopping</option>
                                    <option value="HEALTH">Health</option>
                                    <option value="EDUCATION">Education</option>
                                    <option value="BILLS">Bills</option>
                                    <option value="BUSINESS">Business</option>
                                    <option value="FREELANCE">Freelance</option>
                                    <option value="ENTERTAINMENT">Entertainment</option>
                                    <option value="INVESTMENT">Investment</option>
                                    <option value="OTHER">Other</option>

                                </select>

                            </div>

                            <div className="mb-3">

                                <label>Description</label>

                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label>Date</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >

                                {
                                    editTransaction
                                        ? "Update"
                                        : "Save"
                                }

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default TransactionForm;