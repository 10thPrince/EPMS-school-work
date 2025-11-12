import express from "express";
import { addDepartment, getDepartments } from "../controllers/departmentControllers.js";

const router = express.Router();

router.post("/add", addDepartment);
router.get("/all", getDepartments);

export default router;
