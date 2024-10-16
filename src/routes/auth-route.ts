import { Router, Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

const route = Router();

interface UserProps {
  name: String;
  email: String;
  password: string;
}

//Rota de Registro
route.post("/register", async (req: Request, res: Response) => {
  const user = req.body as UserProps;
  const emailBanco = await User.findOne({ email: user.email });
  const nomeBanco = await User.findOne({ name: user.name });

  if (emailBanco || nomeBanco) {
    res.status(401).json({ message: "Email ou usuário já cadastrado!" });
    return;
  } 


  if (user.password.length < 8) {
    res
      .status(401)
      .json({ message: "Senha muito curta, use pelo menos 8 caractéries!" });
    return;
  }

  const body = {
    name: user.name,
    email: user.email,
    password: await bcrypt.hash(user.password, 8),
  };

  await User.create(body);
  res.status(201).json({ message: "Novo usuário cadastrado!" });
});

//Rota de Login
route.post("/login", async (req: Request, res: Response) => {
  const user = req.body as UserProps;

  const emailBanco = await User.findOne({ email: user.email });
  const nameBanco = await User.findOne({ name: user.name })

  if (!emailBanco) {
    res.status(404).json({ message: "Usuário não encontrado" });
    return;
  }

  const validator = await bcrypt.compare(user.password, emailBanco.password);

  if (!validator) {
    res.status(401).json({ message: "Senha incompatível" });
    return;
  }

  res.status(201).json({ message: "Login efetuado", name: nameBanco });
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
route.get("/getBanco", async (req: Request, res: Response) => {
  const user = req.body as UserProps;
  const response = await User.find().select("-password");
  //const email = req.params.email
  //const response = await User.find({email})
  //const response = await User.find({email}).select("name -_id")
  //const response = await User.find().select("name email -_id")

  res.status(201).json({ message: response });
});

export default route;
