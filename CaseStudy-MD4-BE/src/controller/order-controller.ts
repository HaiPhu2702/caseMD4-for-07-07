import { Request, Response } from "express";
import { Order } from "../model/order";

class OrderController {
    getAll = async (req: Request, res: Response) => {
        let orders = await Order.find();
        res.status(200).json(orders);
    }

}
export default new OrderController();