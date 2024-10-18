import { Router } from "express";
import connection from "../connection.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import authenticateToken from "./../services/authentication.js";
import checkRole from "./../services/checkRole.js";

const router = Router();
dotenv.config();

router.get("/getAllUsers", (req, res) => {
  const query = "select * from user";
  connection.query(query, (err, result) => {
    if (!err) {
      if (result.length <= 0) {
        return res
          .status(400)
          .json({ message: "There is no user on our database!." });
      }
      return res.status(200).json({
        message: "Success!",
        users: result,
      });
    }
    return res.status(500).json(err);
  });
});

router.post("/signup", (req, res) => {
  const user = req.body;
  let query = "select email, password, role, status from user where email = ?";
  connection.query(query, [user.email], (err, result) => {
    if (!err) {
      if (result.length <= 0) {
        query =
          "insert into user(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
        connection.query(
          query,
          [user.name, user.contactNumber, user.email, user.password],
          (err, result) => {
            if (!err) {
              return res
                .status(200)
                .json({ message: "Successfully registed!" });
            }
            return res.status(500).json(err);
          }
        );
      } else {
        return res.status(400).json({ message: "Email already exists." });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/login", (req, res) => {
  const user = req.body;
  const query = "select email,password,role,status from user where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0 || results[0].password !== user.password) {
        return res
          .status(401)
          .json({ message: "Incorrect username or password." });
      }
      if (results[0].status === "false") {
        return res.status(401).json({ message: "Esperando pela aprovação do administrador." });
      }
      if (results[0].password === user.password) {
        const response = { email: results[0].email, role: results[0].role };
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
          expiresIn: "8h",
        });
        return res.status(200).json({ token: accessToken });
      }
      return res
        .status(400)
        .json({ message: "Something went wrong! Please try again later! :(." });
    }
    return res.status(500).json(err);
  });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Aqui está apenas enviando um email com a senha esquecida, não façam isso em casa crianças kkk
// Colocar depois para gerar uma senha aleatória?
router.post("/forgotPassword", (req, res) => {
  const user = req.body;
  const query = "select email, password from user where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res
          .status(200)
          .json({ message: `There is no ${user.email} in this app.` });
      }
      const mailOptions = {
        from: process.env.EMAIL,
        to: results[0].email,
        subject: "Password by Cafe Management System Node",
        html: `<p><b>Your Login details for Cafe Management System</b><br><b>Email:</b> ${results[0].email}<br><b>Password: ${results[0].password}<br><a href='http://localhost:4200'>Click here to login</a></p>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json(error);
        }
        return res
          .status(200)
          .json({ message: "Password sent successfully to your email" });
      });
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/get", authenticateToken, checkRole, (req, res) => {
  const query =
    "select id, name, email, contactNumber, status from user where role='user'";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    }
    return res.status(500).json(err);
  });
});

router.patch("/update", authenticateToken, checkRole, (req, res) => {
  const user = req.body;
  const query = "update user set status=? where id=?";
  connection.query(query, [user.status, user.id], (err, results) => {
    if (!err) {
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "User id does not exists." });
      }
      return res.status(200).json({ message: "User updated Successfully" });
    }
    return res.status(500).json(err);
  });
});

router.get("/checkToken", authenticateToken, (req, res) => {
  return res.status(200).json({ message: "true" });
});

router.post("/changePassword", authenticateToken, (req, res) => {
  const user = req.body;

  const email = res.locals.email;

  let query = "select * from user where email=? and password=?";

  connection.query(query, [email, user.oldPassword], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erro ao consultar banco de dados", details: err });
    }

    if (results.length <= 0) {
      return res.status(400).json({ message: "Incorrect old Password." });
    }

    if (results[0].password === user.oldPassword) {
      query = "update user set password=? where email=?";

      connection.query(query, [user.newPassword, email], (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Erro ao atualizar senha", details: err });
        }

        return res
          .status(200)
          .json({ message: "Password updated successfully." });
      });
    } else {
      return res
        .status(400)
        .json({ message: "Something went wrong. Please try again later." });
    }
  });
});

export default router;
