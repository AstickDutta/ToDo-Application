const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const { notFound, errorHandler } = require('./src/middlewares/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());


app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/todos', require('./src/routes/todoRoutes'));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
