import express from "express";
import dotenv from 'dotenv';
import colors from '@colors/colors'
import { connectDB } from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import session from "express-session";

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
b
app.use(session({
    secret: "suppersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {secure : false}
}))

app.use(express.json());

app.use('/user', authRoutes)

app.listen(port, () => {
    console.log(colors.blue(`App running on port: ${port}`));
})