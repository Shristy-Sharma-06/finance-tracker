import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/transactions"
                    element={
                        <PrivateRoute>
                            <Transactions />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/budget"
                    element={
                        <PrivateRoute>
                            <Budget />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/reports"
                    element={
                        <PrivateRoute>
                            <Reports />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;