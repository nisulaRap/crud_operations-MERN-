import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UsersPage from "./pages/UsersPage";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";

export default function App() {
    return (
        <BrowserRouter>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3500,
                    style: {
                        background: "#1e293b",
                        color: "#f1f5f9",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        fontSize: "14px",
                    },
                    success: { iconTheme: { primary: "#10b981", secondary: "#f1f5f9" } },
                    error: { iconTheme: { primary: "#ef4444", secondary: "#f1f5f9" } },
                }}
            />
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/users/create" element={<CreateUser />} />
                    <Route path="/users/edit/:id" element={<EditUser />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}
