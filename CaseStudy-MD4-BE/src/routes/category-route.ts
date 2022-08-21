import { Router } from "express";
import categoryController from "../controller/category-controller";

export const categoryRoute = Router();
categoryRoute.get('', categoryController.getAll)