import express from "express";
import { addDepartment, getDepartments } from "../controllers/departmentControllers.js";
import { requireLogin } from "../middleware/authMiddleware.js";

const router = express.Router();
// router.use(requireLogin);

router.post("/add", addDepartment);
router.get("/all", getDepartments);

export default router;
