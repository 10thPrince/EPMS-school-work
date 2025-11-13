import express from "express";
import { addSalary, getSalaries, updateSalary, deleteSalary } from "../controllers/salaryController.js";
import { requireLogin } from "../middleware/authMiddleware.js";

const router = express.Router();
// router.use(requireLogin);

router.post("/add", addSalary);
router.get("/all", getSalaries);
router.put("/update", updateSalary);
router.delete("/delete/:id", deleteSalary);

export default router;
