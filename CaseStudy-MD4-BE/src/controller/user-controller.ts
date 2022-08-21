import { NextFunction, Request, Response } from "express";
import { User } from "../model/user";

class UserController {
    getAll = async (req: Request, res: Response) => {
        let users = await User.find().populate('role','name');
        res.status(200).json(users)
    }

    deleteUser = async (req: Request, res: Response, next : NextFunction) => {
        console.log(1);        
        try {
            let allUserId = req.body._id
            // console.log(idTag);
            let flag = 1;
            for (let i = 0; i < allUserId.length; i++) {
                let tag = await User.findById(allUserId[i]);
                console.log(tag);
                if (!tag) {
                    flag = -1;
                }
            }
            if (flag === 1) {
                await User.deleteMany({ _id: allUserId });
            }
            res.status(201).json({});
        } catch (error) {
            next(error);
        }
    }
}
export default new UserController();