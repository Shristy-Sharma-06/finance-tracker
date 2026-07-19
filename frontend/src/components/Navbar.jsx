import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();


    return (

        <nav className="navbar navbar-dark bg-primary shadow">

            <div className="container-fluid">

                {/* Mobile Menu Button */}

                <button
                    className="btn btn-primary d-lg-none"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#sidebarMenu"
                >

                    <FaBars />

                </button>

                <span className="navbar-brand fw-bold">

                    💰 Personal Finance Tracker

                </span>



            </div>

        </nav>

    );

}

export default Navbar;