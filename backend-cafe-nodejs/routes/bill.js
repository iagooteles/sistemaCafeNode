import { Router } from "express";
import connection from "../connection.js";
import authenticateToken from "./../services/authentication.js";
import ejs from "ejs";
import pdf from "html-pdf";
import { v4 as uuidv4 } from "uuid";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post("/generateReport", authenticateToken, (req, res) => {
  const generatedUuid = uuidv4();
  const orderDetails = req.body;
  const productDetailsReport = JSON.parse(orderDetails.productDetails);

  const query =
    "insert into bill(name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy) values(?, ?, ?, ?, ?, ?, ?, ?)";

  connection.query(
    query,
    [
      orderDetails.name,
      generatedUuid,
      orderDetails.email,
      orderDetails.contactNumber,
      orderDetails.paymentMethod,
      orderDetails.totalAmount,
      orderDetails.productDetails,
      res.locals.email,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Aconteceu um erro. tente novamente mais tarde.",
          erro: err,
        });
      }

      ejs.renderFile(
        path.join(__dirname, "../views", "report.ejs"),
        {
          productDetails: productDetailsReport,
          name: orderDetails.name,
          email: orderDetails.email,
          contactNumber: orderDetails.contactNumber,
          paymentMethod: orderDetails.paymentMethod,
          totalAmount: orderDetails.totalAmount,
        },
        (err, html) => {
          if (err) {
            return res.status(500).json({
              message: "Aconteceu um erro. tente novamente mais tarde.",
              erro: err,
            });
          }

          const pdfPath = path.join(
            __dirname,
            "../generated_pdf",
            `${generatedUuid}.pdf`
          );

          pdf.create(html).toFile(pdfPath, (err, data) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Erro ao gerar o PDF.", erro: err });
            }
            return res.status(200).json({
              message: "PDF gerado com successo!",
              uuid: generatedUuid,
            });
          });
        }
      );
    }
  );
});

router.get("/getPdf", authenticateToken, (req, res) => {
  const orderDetails = req.body;
  const pdfPath = `./../generated_pdf/${orderDetails.uuid}.pdf`;

  if (fs.existsSync(pdfPath)) {
    res.contentType("application/pdf");
    fs.createReadStream(pdfPath).pipe(res);
  } else {
    const productDetailsReport = JSON.parse(orderDetails.productDetails);

    ejs.renderFile(
      path.join(__dirname, "../views", "report.ejs"),
      {
        productDetails: productDetailsReport,
        name: orderDetails.name,
        email: orderDetails.email,
        contactNumber: orderDetails.contactNumber,
        paymentMethod: orderDetails.paymentMethod,
        totalAmount: orderDetails.totalAmount,
      },
      (err, html) => {
        console.log(productDetailsReport);
        if (err) {
          return res.status(500).json({
            message: "Aconteceu um erro. tente novamente mais tarde.",
            erro: err,
          });
        }

        const pdfPath = path.join(
          __dirname,
          "../generated_pdf",
          `${orderDetails.uuid}.pdf`
        );

        pdf.create(html).toFile(pdfPath, (err, data) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Erro ao gerar o PDF.", erro: err });
          }
          res.contentType("application/pdf");
          fs.createReadStream(pdfPath).pipe(res);
        });
      }
    );
  }
});

router.get("/getBills", authenticateToken, (req, res, next) => {
  const query = "select * from bill order by id DESC";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    }
    return res.status(500).json(err);
  });
});

router.delete("/deleteAllBills", authenticateToken, (req, res, next) => {
  const query = "delete from bill";

  connection.query(query, (err, results) => {
    if (!err) {
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Bill id not found." });
      }
      return res
        .status(200)
        .json({ message: "All Bills deleted successfully!", results });
    }

    return res
      .status(500)
      .json({ message: "Could not delete bill, try again later!", err });
  });
});

router.delete("/deleteBill/:id", authenticateToken, (req, res, next) => {
  const id = req.params.id;

  const query = "delete from bill where id = ?";

  connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Bill id not found." });
      }
      return res
        .status(200)
        .json({ message: "Bill deleted successfully!", results });
    }

    return res
      .status(500)
      .json({ message: "Could not delete bill, try again later!", err });
  });
});

export default router;
