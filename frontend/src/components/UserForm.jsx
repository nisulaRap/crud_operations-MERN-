import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getUserById, updateUser } from "../api/userApi";
import { toast } from "react-hot-toast";
import { User, Mail, MapPin, Save, ArrowLeft, Loader2 } from "lucide-react";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({ name: "", email: "", address: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (isEditing) {
            setFetching(true);
            getUserById(id)
                .then((res) => setFormData({
                    name: res.data.data.name,
                    email: res.data.data.email,
                    address: res.data.data.address,
                }))
                .catch((err) => toast.error(err.message))
                .finally(() => setFetching(false));
        }
    }, [id, isEditing]);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }
        if (!formData.address.trim()) newErrors.address = "Address is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            if (isEditing) {
                await updateUser(id, formData);
                toast.success("User updated successfully!");
            } else {
                await createUser(formData);
                toast.success("User created successfully!");
            }
            navigate("/users");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="page-loader">
                <Loader2 className="spin" size={40} />
                <p>Loading user data...</p>
            </div>
        );
    }

    return (
        <div className="form-page">
            <div className="form-container">
                <div className="form-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} /> Back
                    </button>
                    <h1 className="form-title">
                        {isEditing ? "Edit User" : "Add New User"}
                    </h1>
                    <p className="form-subtitle">
                        {isEditing ? "Update the user's information below." : "Fill in the details to add a new user."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="user-form" noValidate>
                    <div className={`form-group ${errors.name ? "has-error" : ""}`}>
                        <label htmlFor="name">
                            <User size={16} /> Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. John Doe"
                            autoComplete="off"
                        />
                        {errors.name && <span className="error-msg">{errors.name}</span>}
                    </div>

                    <div className={`form-group ${errors.email ? "has-error" : ""}`}>
                        <label htmlFor="email">
                            <Mail size={16} /> Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="e.g. john@example.com"
                            autoComplete="off"
                        />
                        {errors.email && <span className="error-msg">{errors.email}</span>}
                    </div>

                    <div className={`form-group ${errors.address ? "has-error" : ""}`}>
                        <label htmlFor="address">
                            <MapPin size={16} /> Address
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            rows={3}
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="e.g. 123 Main St, New York, USA"
                        />
                        {errors.address && <span className="error-msg">{errors.address}</span>}
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? (
                            <><Loader2 className="spin" size={18} /> {isEditing ? "Updating..." : "Creating..."}</>
                        ) : (
                            <><Save size={18} /> {isEditing ? "Update User" : "Create User"}</>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}