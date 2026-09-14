// server.js
const express = require("express");
const connectDatabase = require("./database");
const { productfetch } = require("./CONTROLER/product"); // Assuming this function adds a product
const { getAllProducts } = require("./CONTROLER/productController"); // Ensure this path is correct
require("dotenv").config();
const cors = require("cors");
const { addtocart,removefromcart } = require("./CONTROLER/cart");
const aiStylist = require("./CONTROLER/ai");


const { registerUser, otpverification, loginuser, userAuthentication, logout } = require("./CONTROLER/user");
const server = express();
const PORT = process.env.PORT || 8000; // Default to 8000 if PORT isn't set
const cookieParser = require('cookie-parser');


// Connect to the database
connectDatabase();
server.use(cookieParser());
// Middleware
server.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true, // Enable credentials for CORS
}));

server.use(express.json()); // Parse JSON bodies

// Routes
server.post("/product", productfetch); // Route to create a product
server.get("/api/products/all-products", getAllProducts); // Route to get all products
server.post('/api/cart/addtocart', addtocart);
server.delete("/api/cart/remove/:productid",removefromcart);
server.post("/register_user",registerUser);
server.post("/verify-otp",otpverification);
server.post("/login",loginuser);
server.get("/user-auth",userAuthentication);
server.get("/logout",logout);
server.use("/api/ai-stylist", aiStylist);



// Start the server
server.listen(PORT, () => {
  console.log(`Backend Server is running at http://localhost:${PORT}/`);
});
