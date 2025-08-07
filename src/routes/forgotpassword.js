const express = require('express')
const forgotRouter = express.Router()
const User = require("../models/user")
const nodemailer = require('nodemailer')
const jwt = require("jsonwebtoken")

// Send reset link
forgotRouter.post("/forgot-password", async (req, res) => {
    const { emailId } = req.body;
    try {
        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        const resetLink = `http://localhost:3000/reset-password/${token}`; // replace with your frontend URL

        // Send email (configure transporter properly with Gmail or another provider)
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,       // your email
                pass: process.env.EMAIL_PASS   // your email password
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: user.emailId,
            subject: "Password Reset",
            html: `<p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`
        });

        res.json({ message: "Password reset link sent to your email" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = forgotRouter;
