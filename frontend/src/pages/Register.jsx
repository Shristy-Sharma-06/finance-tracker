import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";



function Register() {

    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
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
            const response = await registerUser(formData);

            toast.success(response.data.message ||"Registration Successful");

            setFormData({
                fullName: "",
                username: "",
                email: "",
                password: ""
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
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
                                Register
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

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
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
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
                                    className="btn btn-primary w-100"
                                    type="submit"
                                >
                                    Register
                                </button>

                            </form>

                            <p className="text-center mt-3">

                                Already have an account?

                                <Link to="/">
                                    Login
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;