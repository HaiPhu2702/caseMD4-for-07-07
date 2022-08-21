import { NextFunction, Request, Response } from "express";
import { Tag } from "../model/tag";

class TagController {
    getAll = async (req: Request, res: Response) => {
        let tags = await Tag.find().populate('product','name');
        res.status(200).json(tags);
    }

    deleteTag = async (req: Request, res: Response, next : NextFunction) => {
        console.log(1);        
        try {
            let allIdTag = req.body._id
            // console.log(idTag);
            let flag = 1;
            for (let i = 0; i < allIdTag.length; i++) {
                let tag = await Tag.findById(allIdTag[i]);
                console.log(tag);
                if (!tag) {
                    flag = -1;
                }
            }
            if (flag === 1) {
                await Tag.deleteMany({ _id: allIdTag });
            }
            res.status(201).json({});
        } catch (error) {
            next(error);
        }
    }

}
export default new TagController();