import { restaurantOwnerControllers } from "../Controllers/restaurantOwnerController.js";
import express from "express";

const ownerRouter = express.Router();

ownerRouter.get('/restaurant-owners', restaurantOwnerControllers.getAllOwners)
ownerRouter.get('/restaurant-owners/:id', restaurantOwnerControllers.getOwnerbyId)
ownerRouter.get('/restaurant-owners/:id/owned-restaurants', restaurantOwnerControllers.getUserSpecificRestaurants)
ownerRouter.post('/restaurant-owners/new-owner', restaurantOwnerControllers.createOwner)
ownerRouter.put('/update-owner/:id', restaurantOwnerControllers.updateOwner)
ownerRouter.delete('/delete-owner/:id', restaurantOwnerControllers.deleteOwner)

export default ownerRouter