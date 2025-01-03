import { verify } from 'jsonwebtoken';
import { findById } from '../models/Users.js';

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = verify(token, process.env.JWT_SECRET);
            req.user = await findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

const principal = (req, res, next) => {
    if (req.user && req.user.role === 'Principal') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as a principal' });
    }
};

export default { protect, admin, principal };