import { restaurantControllers } from "../Controllers/restaurantControllers.js";
import express from "express";

const restaurantRouter = express.Router();

restaurantRouter.get('/locations', restaurantControllers.getALLRestaurants);
restaurantRouter.get('/search/name', restaurantControllers.searchRestaurantsByName);
restaurantRouter.get('/find-by-id/:id', restaurantControllers.findRestaurantbyID);
restaurantRouter.post('/new-happy-hour-location', restaurantControllers.addRestaurant);
restaurantRouter.put('/update-happy-hour-location/:id', restaurantControllers.updateRestaurant);
restaurantRouter.delete('/delete-happy-hour-location/:id', restaurantControllers.deleteRestaurant);

export default restaurantRouter