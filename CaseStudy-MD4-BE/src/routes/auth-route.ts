import {Router} from "express";
import AuthController from "../controller/auth-controller";

export const authRoute = Router()
authRoute.post('/register', AuthController.register);
authRoute.post('/login', AuthController.login);
