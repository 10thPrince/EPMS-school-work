import express from "express";
import dotenv from 'dotenv';
import colors from '@colors/colors'
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello from App.js"
    });
})

app.listen(port, () => {
    console.log(colors.blue(`App running on port: ${port}`));
})