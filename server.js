const express = require("express");
const app = express();
const connectDB = require("./config/db");
const User = require("./models/User");

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Express server runs");
});

app.post("/api/auth/signup", async (req, res) => {
    try {
        const{ email, name, username, password} = req.body;

        if(!email || !name || !username || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({
            [{email}]
        })

        if(existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const newUser = new User({
            name, email, username, passord
        });

        await newUser.save();

        return res.status(200).json({
            message: "Registration Successfull"
        })
        
    }

    catch(error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.post("/api/auth/login", async(req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json ({
                message: "Username and Password are required"
            })
        }

        const user = await user.findOne({
            [{}]
        })

        if(!user) {
            return res.status(400)({
                message: "User not found"
            })
        }

        if(user.passord != password) {
            return res.status(400).json ({
                message: "Incorrect Password"
            }) 
        }

        res.status(200).json({
            message: `Welcome, ${user.name}!`,
            user: {
                name: user.name,
                email: user.email,
                username: user.username
            }
        })

    }

    catch(error) {
        res.status(500).json({
            message: "Server Error"
        })
    }
})