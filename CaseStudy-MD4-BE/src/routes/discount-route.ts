import { Router } from "express";
import discountController from "../controller/discount-controller";

export const discountRoute = Router();
discountRoute.get('', discountController.getAll);
discountRoute.post('/create', discountController.addNewDiscount);
// discountRoute.delete('/:id',discountController)