import express from 'express';
import { createEmployee, getEmployees } from '../controllers/employeeControllers.js';

const router = express.Router();

router.get('/', getEmployees)
router.post('/add', createEmployee)

export default router