const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    try {
        // Extract token from Authorization header or cookies
        let token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(403).json({
                message: 'Please login.',
                success: false,
            });
        }

        // Verify token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Token Valid, Move to Next Middleware
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token has expired. Please log in again..',
                success: false,
            });
        }

        return res.status(401).json({
            message: 'Invalid token.',
            success: false,
            error: error.message,
        });
    }
};

module.exports = { authenticate };
