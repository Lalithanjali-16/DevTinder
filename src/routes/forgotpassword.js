const express = require('express');
const forgotRouter = express.Router();
const User = require("../models/user");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const JWT_SECRET =  "DEVTinDer$0709";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

/**
 * POST /forgot-password
 * Sends reset link to user email
 */
forgotRouter.post("/forgot-password", async (req, res) => {
  const { emailId } = req.body;

  if (!emailId) {
    return res.status(400).json({ message: "emailId is required" });
  }

  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create short-lived token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });

    // Link to your frontend
    const resetLink = `${FRONTEND_URL}/reset-password/${token}`;

    // Email transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.emailId,
      subject: "Password Reset",
      html: `<p>Click the link to reset your password (valid for 15 minutes): <a href="${resetLink}">${resetLink}</a></p>`
    });

    res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    console.error("forgot-password error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * POST /reset-password/:token
 * Verifies token and updates password
 */
forgotRouter.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("reset-password error:", err);
    if (err.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Token expired" });
    }
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

module.exports = forgotRouter;
