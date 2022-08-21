import { Router } from "express";
import restaurantController from "../controller/restaurant-controller";

export const restaurantRoute = Router();
restaurantRoute.get('', restaurantController.getAll);
restaurantRoute.post('/delete', restaurantController.deleteRestaurant);