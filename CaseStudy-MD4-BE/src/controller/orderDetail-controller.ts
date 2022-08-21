import { Request, Response } from "express";
import { OrderDetail } from "../model/orderDetail";

class OrderDetailController {
    getAll = async (req: Request, res: Response) => {
        let orderDetails = await OrderDetail.find();
        res.status(200).json(orderDetails);
    }

}
export default new OrderDetailController();