import { Link, useLocation } from "react-router-dom";
import { Users, PlusCircle, Home } from "lucide-react";

export default function Navbar() {
    const { pathname } = useLocation();

    const navLinks = [
        { to: "/", label: "Home", icon: <Home size={18} /> },
        { to: "/users", label: "All Users", icon: <Users size={18} /> },
        { to: "/users/create", label: "Add User", icon: <PlusCircle size={18} /> },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <span className="brand-name">MERN<span className="brand-accent">CRUD</span></span>
            </div>
            <ul className="nav-links">
                {navLinks.map((link) => (
                    <li key={link.to}>
                        <Link
                            to={link.to}
                            className={`nav-link ${pathname === link.to ? "active" : ""}`}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}