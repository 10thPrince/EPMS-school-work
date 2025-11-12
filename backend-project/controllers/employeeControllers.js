import {getDB} from '../config/db.js';


//@desc get Employees
//@route GET /employees
//@access 
export const getEmployees = async(req, res) => {
    res.status(200).json({success: true, message: "GET employees"})
}