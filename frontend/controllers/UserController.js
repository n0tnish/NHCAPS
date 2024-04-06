import express from "express";
import bodyParser from "body-parser";
import { users } from "../model/index.js";

const userRouter = express.Router();

// Fetch users
userRouter.get('/', async (req, res) => {
    try {
        await users.fetchUsers(req, res);
    } catch (error) {
        console.error("Failed to retrieve users:", error);
        res.status(500).json({ msg: 'Failed to retrieve users' });
    }
});

// Fetch user
userRouter.get('/:id', async (req, res) => {
    try {
        await users.fetchUser(req, res);
    } catch (error) {
        console.error("Failed to retrieve a user:", error);
        res.status(500).json({ msg: 'Failed to retrieve a user' });
    }
});

// Update user
userRouter.patch('/update/:id', bodyParser.json(), async (req, res) => {
    const userId = req.params.id; // Extract user ID from request parameters
    try {
        await users.updateUser(userId, req.body, res); // Pass the user ID to updateUser method
    } catch (error) {
        console.error("Update failed:", error);
        res.status(500).json({ msg: 'Update failed' });
    }
});

// Add a user
userRouter.post('/register', bodyParser.json(), async (req, res) => {
    try {
        await users.createUser(req, res);
    } catch (error) {
        console.error("Failed to add new user:", error);
        res.status(500).json({ msg: 'Failed to add new user' });
    }
});

// Delete users
userRouter.delete('/deleteUsers', async (req, res) => {
    try {
        await users.deleteUsers(req, res);
    } catch (error) {
        console.error("Failed to delete users:", error);
        res.status(500).json({ msg: 'Failed to delete users' });
    }
});

// Delete a user
userRouter.delete('/delete/:id', async (req, res) => {
    try {
        await users.deleteUser(req, res);
    } catch (error) {
        console.error("Failed to delete a user:", error);
        res.status(500).json({ msg: 'Failed to delete a user' });
    }
});

// Login
userRouter.post('/login', async (req, res) => {
    try {
        await users.login(req, res);
    } catch (error) {
        console.error("Failed to login:", error);
        res.status(500).json({ msg: 'Failed to login' });
    }
});

export { userRouter, express };