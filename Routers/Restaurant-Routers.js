import { restaurantControllers } from "../Controllers/restaurantControllers.js";
import express from "express";

const restaurantRouter = express.Router();

restaurantRouter.get('/', restaurantControllers.getALLRestaurants);
restaurantRouter.get('/search/name', restaurantControllers.searchRestaurantsByName);
restaurantRouter.get('/:id', restaurantControllers.findRestaurantbyID);
restaurantRouter.post('/new-happy-hour-location', restaurantControllers.addRestaurant);
restaurantRouter.put('/update-happy-hour-location/:id', restaurantControllers.updateRestaurant);
restaurantRouter.delete('/delete-happy-hour-location/:id', restaurantControllers.deleteRestaurant);

export default restaurantRouter