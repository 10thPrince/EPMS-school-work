import express from "express";
import { checkAuth, login, logout } from "../controllers/authController.js";

const router = express.Router();

router.post('/login', login);
router.get('/logout', logout);
router.get('/check', checkAuth);

export default router;