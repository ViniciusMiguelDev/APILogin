import express, { Application } from "express";
import route from "./routes/auth-route";
import mongoose from "mongoose";

const app: Application = express();
const port = 3000;
const url =
  "mongodb+srv://viniciusmigueldev:NLWQpdzi49gKIU7J@clientes.smpce.mongodb.net/?retryWrites=true&w=majority&appName=clientes";

app.use(express.json());

app.use(route);

mongoose.connect(url).then(() => {
  app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
  });
});