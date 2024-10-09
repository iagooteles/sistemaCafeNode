import dotenv from "dotenv";
import http from "node:http";
import app from "./index.js";

dotenv.config();

const server = http.createServer(app);

const PORT = process.env.PORT;
server.listen(PORT);
console.log(`Server conectado na porta ${PORT}`)