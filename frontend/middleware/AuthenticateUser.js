import jwt from "jsonwebtoken";
import { config } from "dotenv";

// Load environment variables from .env file
config();

function createToken(user) {
    return jwt.sign({
        email: user.email,
        password: user.password
    },
    process.env.JWT_SECRET, // Use process.env.SECRET_KEY as the JWT secret key
    {
        expiresIn: '1h'
    });
}

function authenticateUser(req, res, next) {
    // Retrieve a token from the request headers
    const token = req.headers['authorization'];

    if (token) {
        try {
            // Verify the token using the SECRET_KEY from environment variables
            const decoded = jwt.verify(token, secretKey);
            // Check if decoded email matches one of the allowed emails
            const allowedEmails = ['haanimpietersen@gmail.com', 'hoosenammara@gmail.com', 'aakeefahj@gmail.com', 'nishaatgafieldien@gmail.com'];
            if (allowedEmails.includes(decoded.email)) {
                // User is authorized, proceed to the next middleware
                req.user = decoded; // Attach user information to the request object
                next();
            } else {
                // User is not authorized to access this resource, send error response
                res.status(403).json({
                    status: res.statusCode,
                    msg: "Unauthorized"
                });
            }
        } catch (error) {
            // Token verification failed, send error response
            res.status(401).json({
                status: res.statusCode,
                msg: "Invalid token"
            });
        }
    } else {
        // No token provided, send error response
        res.status(401).json({
            status: res.statusCode,
            msg: "Please provide a token"
        });
    }
}

export { createToken, authenticateUser };