import { getDB } from "../config/db.js";

// ➕ Add Department
export const addDepartment = (req, res) => {
    try {
        const db = getDB();
        const q = `
    INSERT INTO Department (DepartmentCode, DepartmentName, GrossSalary, TotalDeduction)
    VALUES (?, ?, ?, ?)
  `;
        const values = [
            req.body.DepartmentCode,
            req.body.DepartmentName,
            req.body.GrossSalary,
            req.body.TotalDeduction
        ];

        db.query(q, values, (err, result) => {
            if (err) return res.status(400).json(err);
            return res.status(200).json({ message: "✅ Department added successfully" });
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "System Error!",
            error: err
        })
        console.log(err);
    }
};

// 📄 Get all Departments
export const getDepartments = (req, res) => {
    try {
        const db = getDB();
        db.query("SELECT * FROM Department", (err, rows) => {
            if (err) return res.status(500).json(err);
            return res.json(rows);
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "System Error!",
            error: err
        })
        console.log(err);
    }
};
