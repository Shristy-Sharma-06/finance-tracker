import { NavLink, useNavigate } from "react-router-dom";
import { Offcanvas } from "bootstrap";
import {
    FaHome,
    FaExchangeAlt,
    FaWallet,
    FaChartBar,
    FaSignOutAlt,
} from "react-icons/fa";
import "../styles/sidebar.css";

function Sidebar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleNavigate = (path) => {

        navigate(path);

        const offcanvasElement = document.getElementById("sidebarMenu");

        if (offcanvasElement) {

            const offcanvas =
                Offcanvas.getInstance(offcanvasElement);

            if (offcanvas) {
                offcanvas.hide();
            }
        }
    };

    return (
        <>
            {/* Desktop Sidebar */}

            <div className="sidebar d-none d-lg-flex flex-column">

                <NavLink to="/dashboard" className="nav-link">
                    <FaHome className="me-2" />
                    Dashboard
                </NavLink>

                <NavLink to="/transactions" className="nav-link">
                    <FaExchangeAlt className="me-2" />
                    Transactions
                </NavLink>

                <NavLink to="/budget" className="nav-link">
                    <FaWallet className="me-2" />
                    Budget
                </NavLink>

                <NavLink to="/reports" className="nav-link">
                    <FaChartBar className="me-2" />
                    Reports
                </NavLink>

                <button
                    className="btn btn-danger mt-auto"
                    onClick={logout}
                >
                    <FaSignOutAlt className="me-2" />
                    Logout
                </button>

            </div>

            {/* Mobile Sidebar */}

            <div
                className="offcanvas offcanvas-start bg-dark"
                id="sidebarMenu"
            >
                <div className="offcanvas-header">

                    <h5 className="text-white">

                        Menu

                    </h5>

                    <button
                        className="btn-close btn-close-white"
                        data-bs-dismiss="offcanvas"
                    ></button>

                </div>

                <div className="offcanvas-body d-flex flex-column">

                    <button
                        className="nav-link text-start"
                        onClick={() => handleNavigate("/dashboard")}
                    >
                        <FaHome className="me-2" />
                        Dashboard
                    </button>

                    <button
                        className="nav-link text-start"
                        onClick={() => handleNavigate("/transactions")}
                    >
                        <FaExchangeAlt className="me-2" />
                        Transactions
                    </button>

                    <button
                        className="nav-link text-start"
                        onClick={() => handleNavigate("/budget")}
                    >
                        <FaWallet className="me-2" />
                        Budget
                    </button>

                    <button
                        className="nav-link text-start"
                        onClick={() => handleNavigate("/reports")}
                    >
                        <FaChartBar className="me-2" />
                        Reports
                    </button>
                    <button
                        className="btn btn-danger mt-auto"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/");
                            const offcanvas = Offcanvas.getInstance(
                                document.getElementById("sidebarMenu")
                            );
                            if (offcanvas) offcanvas.hide();
                        }}
                    >
                        Logout
                    </button>

                </div>

            </div>
        </>
    );
}

export default Sidebar;