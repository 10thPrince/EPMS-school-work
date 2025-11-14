import { getDB } from '../config/db.js';


//@desc get Employees
//@route GET /employees
//@access 
export const getEmployees = async (req, res) => {
    
    try {
        const db = getDB();

        const q = `SELECT * from employees`;

        db.query(q, (err, result) => {
            if(err) return res.status(400).json({
                success: false,
                message: "An Error occured!",
                error: err
            })
            return res.status(200).json({
                success: true,
                data: result
            })
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "System Error!",
            error: err
        })
        console.log(err);
    }
}

//@desc create employee
//@route POST /employee
//@access Private
export const createEmployee = (req, res) => {
    try {
        const db = getDB();

        const { first_name, last_name, position, address, telephone, gender, hired_date, department_id } = req.body;

        if(!first_name || !last_name || !position || !address || !telephone || !gender || !hired_date || !department_id){
            return res.status(400).json({
                success: false,
                message: 'Please fill in the required Fields',
            })
        }

        const q = `INSERT INTO employees (first_name, last_name, position, address, telephone, gender, hired_date, department_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

        const values = [first_name, last_name, position, address, telephone, gender, hired_date, department_id];

        db.query(q, values, (err, result) => {
            if(err){
                return res.status(400).json({
                    success: false,
                    message: "An error Occured!",
                    error: err
                })
            }
            return res.status(200).json({
                success: true, 
                message: "Employee added in the System Successfully!",
                result: result
            })
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "System Error!",
            error: err
        })
        console.log(err);
    }
}

