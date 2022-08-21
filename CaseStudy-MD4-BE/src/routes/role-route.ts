import { Router } from "express";
import roleController from "../controller/role-controller";

export const roleRoute = Router();
roleRoute.get('', roleController.getAll)