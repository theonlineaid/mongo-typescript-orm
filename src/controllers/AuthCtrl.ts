import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authCtrl = {

    // Register new user
    register: async (req: Request, res: Response) => {
        const { name, email, password } = req.body;

        try {
            // Check if user already exists
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user in the database
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            // Remove password before sending the response
            delete newUser.password;

            return res.status(201).json({
                message: "User created successfully",
                user: newUser,
            });
        } catch (error) {
            console.error("Error registering user:", error);
            return res.status(500).json({ message: "Server error" });
        }
    },

    // Login user
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            // Check if user exists
            const user = await prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            // Compare password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            // Create JWT token
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET || "your_jwt_secret",
                { expiresIn: "1h" }
            );

            // Remove password from response
            delete user.password;

            return res.status(200).json({
                message: "Login successful",
                user: user,
                token,
            });
        } catch (error) {
            console.error("Error logging in user:", error);
            return res.status(500).json({ message: "Server error" });
        }
    },
};

export default authCtrl;
