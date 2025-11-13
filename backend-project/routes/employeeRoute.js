import express from 'express';
import { createEmployee, getEmployees } from '../controllers/employeeControllers.js';
import { requireLogin } from '../middleware/authMiddleware.js';

const router = express.Router();
// router.use(requireLogin);

router.get('/all', getEmployees)
router.post('/add', createEmployee)

export default router