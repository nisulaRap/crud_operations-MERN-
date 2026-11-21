import { Link } from "react-router-dom";
import {
    Users, UserPlus, UserCheck, Pencil, Trash2,
    Database, Server, Globe, ArrowRight,
    ShieldCheck, Zap, Search, LayoutGrid
} from "lucide-react";

const operations = [
    {
        icon: <UserPlus size={22} />,
        label: "Create",
        color: "#10b981",
        bg: "rgba(16,185,129,0.1)",
        border: "rgba(16,185,129,0.25)",
        desc: "Register new users with name, email, and address validation.",
        to: "/users/create",
        action: "Add User",
    },
    {
        icon: <LayoutGrid size={22} />,
        label: "Read",
        color: "#6366f1",
        bg: "rgba(99,102,241,0.1)",
        border: "rgba(99,102,241,0.25)",
        desc: "Browse all users in a responsive card grid with live search.",
        to: "/users",
        action: "View Users",
    },
    {
        icon: <Pencil size={22} />,
        label: "Update",
        color: "#f59e0b",
        bg: "rgba(245,158,11,0.1)",
        border: "rgba(245,158,11,0.25)",
        desc: "Edit any user's details instantly with pre-filled forms.",
        to: "/users",
        action: "Edit a User",
    },
    {
        icon: <Trash2 size={22} />,
        label: "Delete",
        color: "#ef4444",
        bg: "rgba(239,68,68,0.1)",
        border: "rgba(239,68,68,0.25)",
        desc: "Remove users safely with a confirmation dialog.",
        to: "/users",
        action: "Manage Users",
    },
];

const highlights = [
    {
        icon: <ShieldCheck size={20} />,
        title: "Data Validation",
        desc: "Schema-level validation via Mongoose ensures clean, consistent data on every request.",
    },
    {
        icon: <Search size={20} />,
        title: "Live Search",
        desc: "Instantly filter users by name, email, or address without any page reload.",
    },
    {
        icon: <Zap size={20} />,
        title: "RESTful API",
        desc: "Clean Express.js REST endpoints with proper HTTP status codes and error handling.",
    },
    {
        icon: <UserCheck size={20} />,
        title: "Duplicate Guard",
        desc: "Prevents duplicate email registration at both the API and database index level.",
    },
];

const stack = [
    { icon: <Database size={18} />, name: "MongoDB Atlas", role: "Database" },
    { icon: <Server size={18} />, name: "Express.js", role: "REST API" },
    { icon: <Globe size={18} />, name: "React + Vite", role: "Frontend" },
    { icon: <Server size={18} />, name: "Node.js", role: "Runtime" },
];

export default function Home() {
    return (
        <div className="home-page">

            {/* ── Hero ── */}
            <section className="hero">
                <div className="hero-eyebrow">
                    <Users size={14} />
                    <span>User Management System</span>
                </div>
                <h1 className="hero-title">
                    Manage Your Users<br />
                    <span className="hero-gradient">With Full Control</span>
                </h1>
                <p className="hero-subtitle">
                    A production-ready MERN stack application with complete CRUD operations,
                    real-time search, form validation, and a clean REST API - all in one place.
                </p>
                <div className="hero-actions">
                    <Link to="/users" className="hero-btn primary">
                        <Users size={18} /> View All Users
                        <ArrowRight size={16} />
                    </Link>
                    <Link to="/users/create" className="hero-btn secondary">
                        <UserPlus size={18} /> Add New User
                    </Link>
                </div>
            </section>

            {/* ── CRUD Operations ── */}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">Available Operations</h2>
                    <p className="section-subtitle">
                        Every CRUD operation is fully implemented end-to-end - from the UI through the API to the database.
                    </p>
                </div>
                <div className="ops-grid">
                    {operations.map((op) => (
                        <div
                            className="op-card"
                            key={op.label}
                            style={{ "--op-color": op.color, "--op-bg": op.bg, "--op-border": op.border }}
                        >
                            <div className="op-icon-wrap">
                                {op.icon}
                            </div>
                            <div className="op-content">
                                <span className="op-label">{op.label}</span>
                                <p className="op-desc">{op.desc}</p>
                            </div>
                            <Link to={op.to} className="op-link">
                                {op.action} <ArrowRight size={14} />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Key Highlights ── */}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">Key Highlights</h2>
                    <p className="section-subtitle">
                        Built with developer experience and reliability in mind.
                    </p>
                </div>
                <div className="highlights-grid">
                    {highlights.map((h) => (
                        <div className="highlight-card" key={h.title}>
                            <div className="highlight-icon">{h.icon}</div>
                            <div>
                                <h4 className="highlight-title">{h.title}</h4>
                                <p className="highlight-desc">{h.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── API Reference Strip ── */}
            <section className="api-strip">
                <h3 className="api-strip-title">REST API Endpoints</h3>
                <div className="api-table">
                    {[
                        { method: "POST", path: "/api/users/create", desc: "Create a new user" },
                        { method: "GET", path: "/api/users/", desc: "Retrieve all users" },
                        { method: "GET", path: "/api/users/:id", desc: "Retrieve a user by ID" },
                        { method: "PUT", path: "/api/users/update/:id", desc: "Update a user" },
                        { method: "DELETE", path: "/api/users/delete/:id", desc: "Delete a user" },
                    ].map((e) => (
                        <div className="api-row" key={e.path}>
                            <span className={`api-method method-${e.method.toLowerCase()}`}>{e.method}</span>
                            <code className="api-path">{e.path}</code>
                            <span className="api-desc">{e.desc}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Tech Stack ── */}
            <section className="stack-section">
                <p className="stack-label">Powered by</p>
                <div className="stack-row">
                    {stack.map((s) => (
                        <div className="stack-pill" key={s.name}>
                            <span className="stack-pill-icon">{s.icon}</span>
                            <div className="stack-pill-text">
                                <span className="stack-pill-name">{s.name}</span>
                                <span className="stack-pill-role">{s.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}