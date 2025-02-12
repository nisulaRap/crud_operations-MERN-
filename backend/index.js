const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.DB_URL;

mongoose.connect(MONGOURL)
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${ PORT }`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
