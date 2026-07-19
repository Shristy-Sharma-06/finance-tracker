import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    addBudget,
    updateBudget
} from "../services/budgetService";

function BudgetForm({

                        show,
                        handleClose,
                        loadBudgets,
                        editBudget

                    }) {

    const initialState = {

        monthlyLimit: "",
        category: "FOOD",
        month: "",
        year: new Date().getFullYear()

    };

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {

        if (editBudget) {

            setFormData({

                monthlyLimit: editBudget.monthlyLimit,
                category: editBudget.category,
                month: editBudget.month,
                year: editBudget.year

            });

        } else {

            setFormData(initialState);

        }

    }, [editBudget, show]);

    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editBudget) {

                await updateBudget(
                    editBudget.id,
                    formData
                );

                toast.success("Budget Updated Successfully");

            } else {

                await addBudget(formData);

                toast.success("Budget Added Successfully");

            }

            loadBudgets();

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

                                editBudget

                                    ? "Edit Budget"

                                    : "Add Budget"

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

                                <label className="form-label">

                                    Monthly Limit

                                </label>

                                <input

                                    type="number"

                                    name="monthlyLimit"

                                    className="form-control"

                                    value={formData.monthlyLimit}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Category

                                </label>

                                <select

                                    name="category"

                                    className="form-select"

                                    value={formData.category}

                                    onChange={handleChange}

                                >

                                    <option value="FOOD">Food</option>
                                    <option value="TRAVEL">Travel</option>
                                    <option value="SHOPPING">Shopping</option>
                                    <option value="HEALTH">Health</option>
                                    <option value="EDUCATION">Education</option>
                                    <option value="BILLS">Bills</option>
                                    <option value="SALARY">Salary</option>
                                    <option value="BUSINESS">Business</option>
                                    <option value="FREELANCE">Freelance</option>
                                    <option value="INVESTMENT">Investment</option>
                                    <option value="ENTERTAINMENT">Entertainment</option>
                                    <option value="OTHER">Other</option>

                                </select>

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Month

                                    </label>

                                    <input

                                        type="number"

                                        min="1"

                                        max="12"

                                        name="month"

                                        className="form-control"

                                        value={formData.month}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Year

                                    </label>

                                    <input

                                        type="number"

                                        name="year"

                                        className="form-control"

                                        value={formData.year}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

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

                                    editBudget

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

export default BudgetForm;