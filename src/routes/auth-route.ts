import { Router, Request, Response } from "express";
import { User } from "../models/user.model";

const route = Router();

interface UserProps {
  name: String;
  email: String;
  password: String;
}

//Rota de Registro
route.post("/register", async (req: Request, res: Response) => {
  const user = req.body as UserProps;
  const emailBanco = await User.findOne({ email: user.email });

  if (emailBanco) {
    res.status(401).json({ message: "Email já cadastrado!" });
    return;
  }

  await User.create(user);
  res.status(401).json({ message: "Novo usuário cadastrado!" });
});

//Rota de Login
route.post("/login", async (req: Request, res: Response) => {
  const user = req.body as UserProps;

  const emailBanco = await User.findOne({ email: user.email });

  if (!emailBanco) {
    res.status(404).json({ message: "Usuário não encontrado" });
    return;
  }

  if (user.password !== emailBanco?.password) {
    res.status(404).json({ message: "Senha incompatível" });
    return;
  }

  res.status(201).json({ message: "Login efetuado" });
});

//Rota de Delete
route.delete("/delete", async (req: Request, res: Response) => {
  const user = req.body as UserProps;

  const emailBanco = await User.findOne({ email: user.email });

  if (!emailBanco) {
    res.status(401).json({ message: "Usuário não encontrado!" });
    return;
  }

  await User.deleteOne({ email: user.email });
  res.status(201).json({ message: "Usuário Deletado!" });
});

//Rota de ajuste de cadastro
route.put("/ajuste/:email", async (req: Request, res: Response) => {
  const user = req.body as UserProps;
  const email = req.params.email;

  const emailBanco = await User.findOne({ email: email });

  // Verificar se o usuário não existe
  if (!emailBanco) {
    res.status(401).json({ message: "Usuário não cadastrado" });
    return;
  }

  // Atualizar o usuário
  await User.findOneAndUpdate({ email: email }, { $set: user });
  res.status(201).json({ message: "Cadastro atualizado" });
});

//Rota retorno dos dados
//route.get("/getBanco/:email", async (req: Request, res: Response)
route.get("/getBanco/", async (req: Request, res: Response) => {
  const user = req.body as UserProps;
  //const email = req.params.email
  const response = await User.find()
  //const response = await User.find({email})
  //const response = await User.find({email}).select("name -_id")

  res.status(201).json({ message: response });
});

export default route;