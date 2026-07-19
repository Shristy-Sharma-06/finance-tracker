import {
    FaArrowUp,
    FaArrowDown,
    FaPiggyBank,
    FaWallet,
    FaMoneyBillWave,
    FaReceipt
} from "react-icons/fa";
import "../styles/dashboard.css";

function DashboardCard({ title, value, color }) {

    const getIcon = () => {

        switch (title) {

            case "Total Income":
                return <FaArrowUp size={30} />;

            case "Total Expense":
                return <FaArrowDown size={30} />;

            case "Savings":
                return <FaPiggyBank size={30} />;

            case "Monthly Budget":
                return <FaWallet size={30} />;

            case "Remaining Budget":
                return <FaMoneyBillWave size={30} />;

            case "Transactions":
                return <FaReceipt size={30} />;

            default:
                return <FaWallet size={30} />;
        }
    };

    return (

        <div className="col-xl-4 col-md-6 mb-4">

            <div className={`card border-0 shadow dashboard-card bg-${color} text-white`}>

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            <h6 className="text-uppercase">

                                {title}

                            </h6>

                            <h2 className="fw-bold">

                                {value}

                            </h2>

                        </div>

                        <div>

                            {getIcon()}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardCard;