
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Register User API
app.post("/auth/register", (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Name, email, and password are required."
        });
    }

    // Simulate user creation
    const user = {
        id: Date.now(),
        name,
        email
    };

    return res.status(201).json({
        success: true,
        message: "User registered successfully.",
        data: user
    });
});

// Health Check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server is running."
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Harmins file