"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const validator_1 = __importDefault(require("validator"));
const usuarioModelo_1 = __importDefault(require("../models/usuarioModelo"));
const utils_1 = require("../utils/utils");
class UsuarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield usuarioModelo_1.default.list();
                return res.json({ message: "Listado de Usuario", code: 0, users });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var { email, password, role } = req.body;
                var encryptedText = yield utils_1.utils.hashPassword(password);
                password = encryptedText;
                console.log(password);
                const user = { email, password, role };
                if (!validator_1.default.isEmail(email)) {
                    return res.status(400).json({ message: "Email inválido", code: 400 });
                }
                const existingUser = yield usuarioModelo_1.default.listByEmail(email);
                if (existingUser.length > 0) {
                    return res.status(400).json({ message: "Ya existe un usuario con ese email", code: 400 });
                }
                yield usuarioModelo_1.default.add(user);
                return res.json({ message: "Agregar Usuario", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var { email, password, role } = req.body;
                var encryptedText = yield utils_1.utils.hashPassword(password);
                password = encryptedText;
                console.log(password);
                const user = { email, password, role };
                const existingUser = yield usuarioModelo_1.default.listByEmail(email);
                if (existingUser.length === 0) {
                    return res.status(404).json({ message: "Usuario no encontrado", code: 404 });
                }
                yield usuarioModelo_1.default.update(user);
                return res.json({ message: "Modificación de Usuario", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const existingUser = yield usuarioModelo_1.default.listByEmail(email);
                if (existingUser.length === 0) {
                    return res.status(404).json({ message: "Usuario no encontrado", code: 404 });
                }
                yield usuarioModelo_1.default.delete(email);
                return res.json({ message: "Eliminación de Usuario", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
//# sourceMappingURL=usuarioController.js.map