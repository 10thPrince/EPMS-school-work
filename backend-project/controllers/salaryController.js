import { getDB } from "../config/db.js";

// Add Salary
export const addSalary = (req, res) => {
    const db = getDB();
    const { employeeNumber, GrossSalary, TotalDeduction, NetSalary, Month } = req.body;

    const q = `
    INSERT INTO Salary (employeeNumber, GrossSalary, TotalDeduction, NetSalary, Month)
    VALUES (?, ?, ?, ?, ?)
  `;

    db.query(q, [employeeNumber, GrossSalary, TotalDeduction, NetSalary, Month], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "✅ Salary added successfully" });
    });
};

//  Get all Salaries
export const getSalaries = (req, res) => {
    const db = getDB();
    const q = `
    SELECT s.SalaryID, e.FirstName, e.LastName, e.Position, d.DepartmentName, s.NetSalary, s.Month
    FROM Salary s
    JOIN Employee e ON s.employeeNumber = e.employeeNumber
    JOIN Department d ON e.DepartmentCode = d.DepartmentCode
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

