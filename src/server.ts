import express, { Application } from "express";
import route from "./routes/auth-route";
import mongoose from "mongoose";
import path from "path";

const app: Application = express();
const port = 3000;
const url =
  "mongodb+srv://viniciusmigueldev:NLWQpdzi49gKIU7J@clientes.smpce.mongodb.net/?retryWrites=true&w=majority&appName=clientes";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("/login.html"); // Redireciona para a página de login
});

app.use(route);

mongoose.connect(url).then(() => {
  app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
  });
});
