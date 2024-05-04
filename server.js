const express = require('express');
const app = express();
const dotenv = require('dotenv');
const dbConnection = require('./databaseConnection/db');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

dotenv.config();

const port = process.env.PORT;

dbConnection();

app.use(express.json());
app.use(cookieParser());
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log('Server is running on port', port);
});