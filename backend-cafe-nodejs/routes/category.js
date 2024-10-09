import { Router } from "express";
import connection from "../connection.js";
import authenticateToken from "./../services/authentication.js"
import checkRole from "./../services/checkRole.js"

const router = Router();

router.post("/add", authenticateToken, checkRole, (req, res, next) => {
    const category = req.body;
    const query = "insert into category (name) values(?)";
    connection.query(query, [category.name], (err, results) => {
        if (!err) {
            return res.status(200).json({message: "Category Added Successfully"});
        }
            return res.status(500).json(err);
    })
})

router.get("/get", authenticateToken, (req, res, next) => {
    const query = "select * from category order by name"
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } 
        return res.status(500).json(err);
    })
})

router.patch("/update", authenticateToken, checkRole, (req, res, next) => {
    const product = req.body;
    const query = "update category set name=? where id=?";
    connection.query(query, [product.name, product.id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(404).json({message: "Category id not found."});
            } 
            return res.status(200).json({message: "Category updated successfully."})
        }
        return res.status(500).json(err);
    })
})

export default router;