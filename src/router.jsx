import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditCard from "./pages/EditCard";
import PublicCard from "./pages/PublicCard";
import PaymentPage from "./pages/PaymentPage";
import AdminOverview from "./pages/AdminOverview";
import ProtectedRoute from "./components/ProtectedRoute";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path="/dashboard"
                    element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
                />
                <Route
                    path="/edit-card"
                    element={<ProtectedRoute><EditCard /></ProtectedRoute>}
                />
                <Route path="/card/:handle" element={<PublicCard />} />
                <Route
                    path="/payment"
                    element={<ProtectedRoute><PaymentPage /></ProtectedRoute>}
                />
                <Route
                    path="/admin"
                    element={<ProtectedRoute adminOnly><AdminOverview /></ProtectedRoute>}
                />
            </Routes>
        </BrowserRouter>
    )
}