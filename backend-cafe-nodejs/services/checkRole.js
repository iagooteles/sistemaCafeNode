import dotenv from "dotenv";

dotenv.config();

export default function checkRole(req, res, next) {
  if (res.locals.role === process.env.USER) {
    res.sendStatus(401);
  } else {
    next();
  }
}
