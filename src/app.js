const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/route.user');
const adminRoutes = require('./routes/route.admin');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/admins', adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get('/', (req, res) => {
    // Send the HTML file as the response
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
app.use(express.static(path.join(__dirname, 'frontend')));
