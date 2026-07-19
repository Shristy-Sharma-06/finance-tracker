import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
    getMonthlyReport,
    getAnnualReport,
    getCategoryReport,
    downloadPdf,
    downloadCsv
} from "../services/reportService";

function Reports() {

    const currentDate = new Date();

    const [month, setMonth] = useState(currentDate.getMonth() + 1);

    const [year, setYear] = useState(currentDate.getFullYear());

    const [monthlyReport, setMonthlyReport] = useState(null);

    const [annualReport, setAnnualReport] = useState(null);

    const [categoryReport, setCategoryReport] = useState([]);

    useEffect(() => {

        loadReports();

    }, []);

    const loadReports = async () => {

        try {

            const monthly = await getMonthlyReport(month, year);

            const annual = await getAnnualReport(year);

            const category = await getCategoryReport();

            setMonthlyReport(monthly.data);

            setAnnualReport(annual.data);

            setCategoryReport(category.data);

        } catch (error) {

            toast.error("Failed to load reports");

        }

    };

    const handlePdfDownload = async () => {

        try {

            const response = await downloadPdf(month, year);

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "Monthly_Report.pdf";

            link.click();

        } catch {

            toast.error("PDF Download Failed");

        }

    };

    const handleCsvDownload = async () => {

        try {

            const response = await downloadCsv(month, year);

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "Monthly_Report.csv";

            link.click();

        } catch {

            toast.error("CSV Download Failed");

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

                        <h2 className="mb-4">

                            Reports

                        </h2>

                        <div className="card mb-4">

                            <div className="card-body">

                                <div className="row">

                                    <div className="col-md-3">

                                        <label>Month</label>

                                        <input
                                            type="number"
                                            min="1"
                                            max="12"
                                            className="form-control"
                                            value={month}
                                            onChange={(e) =>
                                                setMonth(e.target.value)
                                            }
                                        />

                                    </div>

                                    <div className="col-md-3">

                                        <label>Year</label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            value={year}
                                            onChange={(e) =>
                                                setYear(e.target.value)
                                            }
                                        />

                                    </div>

                                    <div className="col-md-3 d-flex align-items-end">

                                        <button
                                            className="btn btn-primary w-100"
                                            onClick={loadReports}
                                        >

                                            Generate Report

                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-6">

                                <div className="card mb-4">

                                    <div className="card-header">

                                        Monthly Report

                                    </div>

                                    <div className="card-body">

                                        <p>

                                            <strong>Total Income:</strong> ₹ {monthlyReport?.totalIncome ?? 0}

                                        </p>

                                        <p>

                                            <strong>Total Expense:</strong> ₹ {monthlyReport?.totalExpense ?? 0}

                                        </p>

                                        <p>

                                            <strong>Savings:</strong> ₹ {monthlyReport?.savings ?? 0}

                                        </p>

                                        <p>

                                            <strong>Transactions:</strong> {monthlyReport?.totalTransactions ?? 0}

                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-6">

                                <div className="card mb-4">

                                    <div className="card-header">

                                        Annual Report

                                    </div>

                                    <div className="card-body">

                                        <p>

                                            <strong>Total Income:</strong> ₹ {annualReport?.totalIncome ?? 0}

                                        </p>

                                        <p>

                                            <strong>Total Expense:</strong> ₹ {annualReport?.totalExpense ?? 0}

                                        </p>

                                        <p>

                                            <strong>Total Savings:</strong> ₹ {annualReport?.totalSavings ?? 0}

                                        </p>

                                        <p>

                                            <strong>Transactions:</strong> {annualReport?.totalTransactions ?? 0}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="card mb-4">

                            <div className="card-header">

                                Category Wise Expense

                            </div>

                            <div className="card-body">

                                <table className="table table-bordered">

                                    <thead>

                                    <tr>

                                        <th>Category</th>

                                        <th>Amount</th>

                                    </tr>

                                    </thead>

                                    <tbody>

                                    {

                                        categoryReport.map((item, index) => (

                                            <tr key={index}>

                                                <td>{item.category}</td>

                                                <td>₹ {item.amount}</td>

                                            </tr>

                                        ))

                                    }

                                    </tbody>

                                </table>

                            </div>

                        </div>

                        <div className="d-flex gap-3">

                            <button
                                className="btn btn-danger"
                                onClick={handlePdfDownload}
                            >

                                Download PDF

                            </button>

                            <button
                                className="btn btn-success"
                                onClick={handleCsvDownload}
                            >

                                Download CSV

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Reports;