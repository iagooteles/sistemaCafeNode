import { Router } from "express";
import connection from "../connection.js";
import authenticateToken from "./../services/authentication.js";
import checkRole from "./../services/checkRole.js";

const router = Router();

router.post("/add", authenticateToken, checkRole, (req, res) => {
  const product = req.body;
  const query =
    "insert into product (name, categoryId, description, price, status) values (?, ?, ?, ?, 'true')";

  connection.query(
    query,
    [product.name, product.categoryId, product.description, product.price],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "Product added successfully." });
      }
      return res.status(500).json(err);
    }
  );
});

router.get("/get", authenticateToken, (req, res, next) => {
  const query =
    "select p.id, p.name, p.description, p.price, p.status, c.id as categoryId, c.name as categoryName from product as p INNER JOIN category as c where p.categoryId = c.id";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    }
    return res.status(500).json(err);
  });
});

router.get("/getByCategory", authenticateToken, (req, res, next) => {
  const categoryId = req.body.categoryId;
  const query =
    "select * from product where categoryId = ? and status = 'true' ";

  connection.query(query, [categoryId], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    }
    return res.status(500).json(err);
  });
});

router.get(
  "/getByCategory/:categoryId",
  authenticateToken,
  (req, res, next) => {
    const categoryId = req.params.categoryId;

    const query =
      "select id, name from product where categoryId = ? and status = 'true' ";

    connection.query(query, [categoryId], (err, results) => {
      if (!err) {
        return res.status(200).json(results);
      }
      return res.status(500).json(err);
    });
  }
);

router.get("/getById/:productId", authenticateToken, (req, res, next) => {
  const productId = req.params.productId;
  const query =
    "select id, name, price, description, status from product where id = ? ";

  connection.query(query, [productId], (err, results) => {
    if (!err) {
      if (results.length === 0) {
        return res
          .status(400)
          .json({ message: `No product with this ID: ${productId}` });
      }
      return res.status(200).json(results);
    }
    return res.status(500).json(err);
  });
});

router.patch("/update", authenticateToken, checkRole, (req, res, next) => {
  const product = req.body;
  const query =
    "update product set name = ?, categoryId = ?, description = ?, price = ? where id = ?";

  connection.query(
    query,
    [
      product.name,
      product.categoryId,
      product.description,
      product.price,
      product.id,
    ],
    (err, results) => {
      if (!err) {
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Product id not found." });
        }
        return res
          .status(200)
          .json({ message: "Product updated successfully.", results });
      }
      return res.status(500).json(err);
    }
  );
});

router.patch(
  "/updateStatus",
  authenticateToken,
  checkRole,
  (req, res, next) => {
    const user = req.body;
    const query = "update product set status = ? where id = ?";

    connection.query(query, [user.status, user.productId], (err, results) => {
      if (!err) {
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Product Id not found." });
        }
        return res
          .status(200)
          .json({ message: "Product status updated successfully." });
      }
      return res.status(500).json(err);
    });
  }
);

router.delete(
  "/delete/:productId",
  authenticateToken,
  checkRole,
  (req, res, next) => {
    const productId = req.params.productId;
    const query = "delete from product where id = ?";

    connection.query(query, [productId], (err, results) => {
      if (!err) {
        if (results.affectedRows === 0) {
          res.status(400).json({ message: "Product ID not found." });
        }
        return res
          .status(200)
          .json({ message: "Product deleted successfully." });
      }
      return res.status(500).json(err);
    });
  }
);

export default router;
