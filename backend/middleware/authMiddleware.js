import jwt from 'jsonwebtoken';
import {users} from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'No token provided'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = users[decoded.username];

        if (!req.user) {
            return res.status(401).json({message: 'User not found'});
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({message: 'Token invalid'});
    }
};
