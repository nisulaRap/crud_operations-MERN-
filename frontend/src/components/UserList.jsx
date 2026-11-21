import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAllUsers, deleteUser } from "../api/userApi";
import { toast } from "react-hot-toast";
import {
    Users, PlusCircle, Pencil, Trash2, Search,
    Loader2, User, Mail, MapPin, RefreshCw
} from "lucide-react";

function ConfirmModal({ isOpen, onConfirm, onCancel, userName }) {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Delete User?</h2>
                <p className="modal-body">
                    Are you sure you want to delete <strong>{userName}</strong>?
                    This action cannot be undone.
                </p>
                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onCancel}>Cancel</button>
                    <button className="btn-danger" onClick={onConfirm}>Yes, Delete</button>
                </div>
            </div>
        </div>
    );
}

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: "" });

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllUsers();
            setUsers(res.data.data);
            setFiltered(res.data.data);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        const q = search.toLowerCase();
        setFiltered(
            users.filter(
                (u) =>
                    u.name.toLowerCase().includes(q) ||
                    u.email.toLowerCase().includes(q) ||
                    u.address.toLowerCase().includes(q)
            )
        );
    }, [search, users]);

    const openDelete = (id, name) => setDeleteModal({ open: true, id, name });
    const closeDelete = () => setDeleteModal({ open: false, id: null, name: "" });

    const handleDelete = async () => {
        try {
            await deleteUser(deleteModal.id);
            toast.success("User deleted successfully!");
            setUsers((prev) => prev.filter((u) => u._id !== deleteModal.id));
            closeDelete();
        } catch (err) {
            toast.error(err.message);
            closeDelete();
        }
    };

    const getInitials = (name) =>
        name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

    const avatarColors = [
        "#6366f1", "#8b5cf6", "#ec4899", "#f59e0b",
        "#10b981", "#3b82f6", "#ef4444", "#14b8a6"
    ];
    const getColor = (name) =>
        avatarColors[name.charCodeAt(0) % avatarColors.length];

    return (
        <div className="list-page">
            <ConfirmModal
                isOpen={deleteModal.open}
                onConfirm={handleDelete}
                onCancel={closeDelete}
                userName={deleteModal.name}
            />

            {/* Header */}
            <div className="list-header">
                <div>
                    <h1 className="list-title">
                        <Users size={28} /> User Management
                    </h1>
                    <p className="list-subtitle">
                        {users.length} {users.length === 1 ? "user" : "users"} in the database
                    </p>
                </div>
                <div className="list-actions">
                    <button className="refresh-btn" onClick={fetchUsers} title="Refresh">
                        <RefreshCw size={18} />
                    </button>
                    <Link to="/users/create" className="add-btn">
                        <PlusCircle size={18} /> Add User
                    </Link>
                </div>
            </div>

            {/* Search */}
            <div className="search-bar">
                <Search size={18} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search by name, email, or address..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                    <button className="clear-search" onClick={() => setSearch("")}>✕</button>
                )}
            </div>

            {/* Content */}
            {loading ? (
                <div className="page-loader">
                    <Loader2 className="spin" size={40} />
                    <p>Loading users...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">
                        {search ? "🔍" : "👥"}
                    </div>
                    <h3>{search ? "No results found" : "No users yet"}</h3>
                    <p>{search ? `No users match "${search}"` : "Get started by adding your first user."}</p>
                    {!search && (
                        <Link to="/users/create" className="add-btn">
                            <PlusCircle size={18} /> Add First User
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    {search && (
                        <p className="search-results-info">
                            Showing <strong>{filtered.length}</strong> of <strong>{users.length}</strong> users
                        </p>
                    )}
                    <div className="user-grid">
                        {filtered.map((user) => (
                            <div className="user-card" key={user._id}>
                                <div className="card-avatar" style={{ background: getColor(user.name) }}>
                                    {getInitials(user.name)}
                                </div>
                                <div className="card-body">
                                    <h3 className="card-name">{user.name}</h3>
                                    <div className="card-info">
                                        <span><Mail size={14} /> {user.email}</span>
                                        <span><MapPin size={14} /> {user.address}</span>
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <Link
                                        to={`/users/edit/${user._id}`}
                                        className="action-btn edit-btn"
                                        title="Edit user"
                                    >
                                        <Pencil size={16} /> Edit
                                    </Link>
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => openDelete(user._id, user.name)}
                                        title="Delete user"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}