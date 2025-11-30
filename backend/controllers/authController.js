const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Wrong password" });

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            "SECRET123",
            { expiresIn: "7d" }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
};

const registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ error: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashed,
            role
        });

        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: "Registration failed" });
    }
};

module.exports = { loginUser, registerUser };
