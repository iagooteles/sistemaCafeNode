import { Router } from "express";
import connection from "../connection.js";
import authenticateToken from "./../services/authentication.js";
import checkRole from "./../services/checkRole.js";

const router = Router();

router.post("/add", authenticateToken, checkRole, (req, res) => {
  const product = req.body;
  const query =
    "insert into product (name, categoryId, description, price, disponivel) values (?, ?, ?, ?, '1')";

  connection.query(
    query,
    [product.name, product.categoryId, product.description, product.price],
    (err, results) => {
      if (!err) {
        return res
          .status(200)
          .json({ message: "Produto adicionado com sucesso." });
      }
      return res.status(500).json(err);
    }
  );
});

router.get("/get", authenticateToken, (req, res, next) => {
  const query =
    "select p.id, p.name, p.description, p.price, p.disponivel, c.id as categoryId, c.name as categoryName from product as p INNER JOIN category as c where p.categoryId = c.id";

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
    "select * from product where categoryId = ? and disponivel = '1' ";

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
      "select id, name from product where categoryId = ? and disponivel = '1' ";

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
    "select id, name, price, description, disponivel from product where id = ? ";

  connection.query(query, [productId], (err, results) => {
    if (!err) {
      if (results.length === 0) {
        return res
          .status(400)
          .json({ message: `ID do produto não encontrado: ${productId}` });
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
          return res
            .status(404)
            .json({ message: "ID do produto não encontrado." });
        }
        return res
          .status(200)
          .json({
            message: "Produto alterado com sucesso.",
            results,
          });
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
    const query = "update product set disponivel = ? where id = ?";

    connection.query(
      query,
      [user.disponivel, user.productId],
      (err, results) => {
        if (!err) {
          if (results.affectedRows === 0) {
            return res.status(404).json({ message: "ID do produto não encontado." });
          }
          return res
            .status(200)
            .json({ message: "Disponibilidade do produto alterada com sucesso!" });
        }
        console.log(err);

        return res
          .status(500)
          .json({
            message: "Algo deu errado, tente novamente mais tarde.",
            err,
          });
      }
    );
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
          res.status(400).json({ message: "ID do produto não encontrado." });
        }
        return res
          .status(200)
          .json({ message: "Produto deletado com sucesso!" });
      }
      return res.status(500).json(err);
    });
  }
);

export default router;
