import { NextFunction, Request, Response } from 'express';
import { Discount } from "../model/discount";

class DiscountController {
    getAll = async (req: Request, res: Response) => {
        let discounts = await Discount.find();
        res.status(200).json(discounts);
    }

    addNewDiscount = async (req: Request, res : Response, next : NextFunction) => {
        try {
            let discount = req.body;
            discount = await Discount.create(discount);
            let id = discount._id;
            let regex : RegExp = /^[0-9a-fA-F]{24}$/;
            if (regex.test(id)) {
                let newDiscount = await Discount.findById(discount._id)
                res.status(200).json(newDiscount);
            }
        } catch (err) {
            next(err);
        }
    }
    delete =async (req: Request, res : Response) => {
        
    }

}
export default new DiscountController();