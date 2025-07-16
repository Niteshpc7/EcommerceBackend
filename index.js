const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const cors = require('cors');
dotenv.config();

connectDB();
const app = express();

app.use(express.json());
 app.use(cors({
  origin: '*',
    methods: ['GET', 'POST','PUT','PATCH','DELETE'],
    credentials: true 
 }))
 app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/auth", require("./src/routes/passwordRoutes"));
app.use("/api/product", require("./src/routes/productRoutes"));
app.use("/api/admin",require('./src/routes/adminRoutes'))
app.use('/api/cart', require('./src/routes/cartRoutes'));
// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
