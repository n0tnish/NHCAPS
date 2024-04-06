import express from "express";
import { userRouter } from "./controllers/UserController.js";
import { productRouter } from "./controllers/ProductController.js";
import cookieParser from "cookie-parser";
import { errorHandling } from "./middleware/ErrorHandling.js";
import path from 'path'
import { config } from "dotenv";
import cors from 'cors'
import { cartRouter } from "./controllers/CartController.js";
import { authenticateUser } from './middleware/AuthenticateUser.js';
config()

const app=express()
const port = +process.env.PORT || 8080

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './static/index.html'));
});

// Error handling middleware
app.use(errorHandling);

// users
app.use('/users',userRouter)

app.post('/users', (req, res) => {
    const userData = req.body;
    users.addUser(userData, res);
});

app.patch('/users/:id', (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    users.updateUser(userId, userData, res);
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    users.deleteUser(userId, res);
});

// Products 
app.use('/products',productRouter)

app.post('/products', (req, res) => {
    products.addProduct(req, res);
});

app.patch('/products/:id', (req, res) => {
    products.updateProduct(req, res);
});

app.delete('/products', (req, res) => {
    products.deleteProducts(req, res);
});

app.delete('/products/:id', (req, res) => {
    products.deleteProduct(req, res);
});

//cart
app.use('/cart',cartRouter)

app.get('/cart/:userId', (req, res) => {
    const userId = req.params.userId;
    cart.fetchCart(userId, res);
});

app.delete('/cart/:userId/:itemId', (req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    cart.deleteItemFromCart(userId, itemId, res);
});

app.get('/admin', authenticateUser, (req, res) => {
    // Check if user is authorized to access this route
    if (req.user.isAdmin) {
      // Return admin page data
      res.json({ message: 'Welcome to the admin page' });
    } else {
      // User is not authorized to access this resource, send error response
      return res.status(403).json({ message: 'Unauthorized' });
    }
  });

app.use(errorHandling)
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})