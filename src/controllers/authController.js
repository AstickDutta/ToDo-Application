const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');


const signUp = async (req, res) => {
    try {
        const { username, email, password, status } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ username, email, password, status });
        res.status(201).json({ status: true, message: "user created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: false, message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: false, message: 'Invalid credentials' });
        }

        if (!user.status) {
            user.status = true;
            await user.save();
        }

        res.json({ status: true, message: "User logged in successfully", id: user._id, token: generateToken(user._id) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const logout = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.status === false) {
            return res.status(400).json({ message: 'User already logged out' });
        }

        user.status = false;
        await user.save();

        res.status(200).json({ status: true, message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { signUp, login, logout };
