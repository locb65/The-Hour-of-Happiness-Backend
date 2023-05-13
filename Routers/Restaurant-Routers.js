import { restaurantControllers } from "../Controllers/restaurantControllers.js";
import express from "express";

const restaurantRouter = express.Router();

restaurantRouter.get('/', restaurantControllers.getALLRestaurants);
restaurantRouter.get('/:id', restaurantControllers.findRestaurantbyID);
restaurantRouter.post('/new-happy-hour-location', restaurantControllers.addRestaurant);
restaurantRouter.put('/update-happy-hour-location', restaurantControllers.updateRestaurant);
restaurantRouter.delete('/delete-happy-hour-location', restaurantControllers.deleteRestaurant);

export default restaurantRouter