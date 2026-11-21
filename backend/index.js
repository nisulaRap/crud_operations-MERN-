const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const userRoute = require('./routes/userRoute');

// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/users", userRoute);

// Health check
app.get("/", (req, res) => {
    res.json({ success: true, message: "MERN CRUD API is running!" });
});

// Connect to MongoDB
const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.DB_URL;

mongoose.connect(MONGOURL)
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    });