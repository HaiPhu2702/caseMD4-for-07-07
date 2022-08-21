import { Router } from "express";
import orderDetailController from "../controller/orderDetail-controller";

export const orderDetailRoute = Router();
orderDetailRoute.get('', orderDetailController.getAll)