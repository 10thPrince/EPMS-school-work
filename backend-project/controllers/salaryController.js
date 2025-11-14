import { getDB } from "../config/db.js";

// Add Salary
export const addSalary = (req, res) => {
    const db = getDB();
    const { employee_id, base_salary, deductions, net_salary, payment_date } = req.body;

    const q = `
    INSERT INTO Salary (employee_id, base_salary, deductions, net_salary, payment_date)
    VALUES (?, ?, ?, ?, ?)
  `;

    db.query(q, [employee_id, base_salary, deductions, net_salary, payment_date], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "✅ Salary added successfully" });
    });
};

//  Get all Salaries
export const getSalaries = (req, res) => {
    const db = getDB();
    const q = `
    SELECT s.salary_id, e.first_name, e.last_name, e.position, d.department_name, s.net_salary, s.payment_date
    FROM Salary s
    JOIN Employee e ON s.employee_id = e.employee_id
    JOIN Department d ON e.department_id = d.department_id
  `;
    db.query(q, (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
};

//  Update Salary
export const updateSalary = (req, res) => {
    const db = getDB();
    const { SalaryID, GrossSalary, TotalDeduction, NetSalary, Month } = req.body;

    const q = `
    UPDATE Salary
    SET GrossSalary=?, TotalDeduction=?, NetSalary=?, Month=?
    WHERE SalaryID=?
  `;
    db.query(q, [GrossSalary, TotalDeduction, NetSalary, Month, SalaryID], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "✅ Salary updated successfully" });
    });
};

//  Delete Salary
export const deleteSalary = (req, res) => {
    const db = getDB();
    const { id } = req.params;

    
    if (!id) {
        return res.status(400).json({ message: "❌ Salary ID is required." });
    }

    
    const checkQuery = "SELECT * FROM Salary WHERE SalaryID = ?";
    db.query(checkQuery, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "❌ Database error while checking salary record.",
                error: err
            });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: `❌ Salary with ID ${id} not found.` });
        }

        
        const deleteQuery = "DELETE FROM Salary WHERE SalaryID = ?";
        db.query(deleteQuery, [id], (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "❌ Failed to delete salary record.",
                    error: err
                });
            }

            res.json({
                message: `✅ Salary with ID ${id} deleted successfully.`,
                affectedRows: data.affectedRows
            });
        });
    });
};

