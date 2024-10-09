import { Router } from "express";
import connection from "../connection.js";
import authenticateToken from "./../services/authentication.js";

const router = Router();

router.get("/details", authenticateToken, async (req, res, next) => {
  try {
    const categoryCount = await new Promise((resolve, reject) => {
      const queryGetCategoryCount =
        "select count(id) as categoryCount from category";
      connection.query(queryGetCategoryCount, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].categoryCount);
      });
    });

    const productCount = await new Promise((resolve, reject) => {
      const queryGetProductCount =
        "select count(id) as productCount from product";
      connection.query(queryGetProductCount, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].productCount);
      });
    });

    const billCount = await new Promise((resolve, reject) => {
      const queryGetBillCount = "select COUNT(id) as billCount from bill";
      connection.query(queryGetBillCount, (err, results) => {
        if (err) return reject(err);
        resolve(results[0].billCount);
      });
    });

    const data = {
      category: categoryCount,
      product: productCount,
      bill: billCount,
    };

    return res.status(200).json({ message: "Details.", data });
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving data", err });
  }
});

export default router;
