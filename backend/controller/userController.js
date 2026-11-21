const User = require("../model/userModel");

// CREATE - Add a new user
const createUser = async (req, res) => {
    try {
        const { name, email, address } = req.body;

        if (!name || !email || !address) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "A user with this email already exists." });
        }

        const newUser = new User({ name, email, address });
        await newUser.save();

        res.status(201).json({ success: true, message: "User created successfully.", data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error.", error: error.message });
    }
};

// READ - Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error.", error: error.message });
    }
};

// READ - Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error.", error: error.message });
    }
};

// UPDATE - Update a user by ID
const updateUser = async (req, res) => {
    try {
        const { name, email, address } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        if (email && email !== user.email) {
            const existing = await User.findOne({ email });
            if (existing) {
                return res.status(409).json({ success: false, message: "Email already in use by another user." });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, address },
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, message: "User updated successfully.", data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error.", error: error.message });
    }
};

// DELETE - Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.status(200).json({ success: true, message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error.", error: error.message });
    }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };