import { Request, Response, NextFunction } from 'express';
import { Restaurant } from "../model/restaurant";

class RestaurantController {
    getAll = async (req: Request, res: Response) => {
        let restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    }

    deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let allStoreId = req.body._id;
            // console.log(allStoreId);
            let flag = 1;
            for (let i = 0; i < allStoreId.length; i++) {
                let restaurant = await Restaurant.findById(allStoreId[i]);
                console.log(restaurant);
                if (!restaurant) {
                    flag = -1;
                }
            }
            if (flag === 1) {
                await Restaurant.deleteMany({ _id: allStoreId });
            }
            res.status(201).json({});
        } catch (error) {
            next(error);
        }
    }

}
export default new RestaurantController();