import express from 'express';
import { Cart } from '../model/index.js';

const cartRouter = express.Router();
const cart = new Cart();

// Fetch all cart items for a user
cartRouter.get('/:userID', (req, res) => {
    try {
        const userID = req.params.userID;
        cart.fetchCart(userID, res);
    } catch (e) {
        res.status(500).json({
            status: res.statusCode,
            msg: 'Failed to retrieve cart items'
        });
    }
});

// Delete a specific item from the cart
cartRouter.delete('/:userID/:prodID', (req, res) => {
    try {
        const userID = req.params.userID;
        const prodID = req.params.prodID;
        cart.deleteCartItem(req, res);
    } catch (e) {
        res.status(500).json({
            status: res.statusCode,
            msg: 'Failed to delete item from cart'
        });
    }
});

cartRouter.post('/add', (req, res) => {
    try {
        cart.addItemToCart(req, res);
    } catch (e) {
        res.status(500).json({
            status: res.statusCode,
            msg: 'Failed to add item to cart'
        });
    }
});

export { cartRouter };