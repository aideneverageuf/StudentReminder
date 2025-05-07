import {users, User} from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const signup = (req, res) => {
    const {username, password} = req.body;

    if (users[username]) {
        return res.status(400).json({message: 'Username already exists'});
    }

    const newUser = new User (username, password);
    users[username] = newUser;

    res.status(201).json({message: 'User created successfully'});
};

export const login = (req, res) => {
    const {username, password} = req.body;
    const user = users[username];

    if (!user || !user.validatePassword(password)) {
        return res.status(401).json({message: 'Invalid username or password'});
    }

    const token = jwt.sign({username}, JWT_SECRET, {expiresIn: '2h'});

    res.json({token});
};
