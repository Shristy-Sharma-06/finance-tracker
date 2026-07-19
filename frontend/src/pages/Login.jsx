import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import {toast} from "react-toastify";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser(formData);

            // Save JWT Token
            localStorage.setItem("token", response.data.token);

            toast.success("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Invalid Username or Password"
            );

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Login
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>Username</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Password</label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <button
                                    className="btn btn-success w-100"
                                    type="submit">

                                    Login

                                </button>

                            </form>

                            <p className="text-center mt-3">

                                Don't have an account?

                                <Link to="/register">
                                    Register
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Login;