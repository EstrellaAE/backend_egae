import { Request, Response } from "express";
import validator from "validator";
import model from "../models/usuarioModelo";
import { utils } from "../utils/utils";


class UsuarioController {


  public async list(req: Request, res: Response) {
    try {
        const users= await model.list()
        return res.json({ message: "Listado de Usuario", code: 0 ,users});
    } catch (error: any) {
        return res.status(500).json({ message: `${error.message}` });
    }
  }


  public async add(req: Request, res: Response) {
    
    try {

      var { email, password, role }=req.body;
      var encryptedText= await utils.hashPassword(password);
      password=encryptedText
      console.log(password)
      const user={ email, password, role };
      

      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Email inválido", code: 400 });
      }

      const existingUser = await model.listByEmail(email);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: "Ya existe un usuario con ese email", code: 400 });
      }

      await model.add(user);
      return res.json({ message: "Agregar Usuario", code: 0 });

    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }


  public async update(req: Request, res: Response) {
    try {
      var { email, password, role }=req.body;
      var encryptedText= await utils.hashPassword(password);
      password=encryptedText
      console.log(password)
      const user={ email, password, role };
      

      const existingUser = await model.listByEmail(email);
      if (existingUser.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado", code: 404 });
      }

      await model.update(user);

      return res.json({ message: "Modificación de Usuario", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }


  public async delete(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const existingUser = await model.listByEmail(email);
      if (existingUser.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado", code: 404 });
      }

      await model.delete(email);

      return res.json({ message: "Eliminación de Usuario", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }
}
export const usuarioController = new UsuarioController();