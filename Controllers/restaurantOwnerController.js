import RestaurantOwnerUsers from "../Models/restaurantOwnerModel.js";

export const restaurantOwnerControllers = {
    getAllOwners: async (req, res) => {
        try {
            const allRestaurantOwners = await RestaurantOwnerUsers.find();
            res.json(allRestaurantOwners);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    getOwnerbyId: async (req, res) => {
        try {
            const id = req.params.id;
            const ownerById = await RestaurantOwnerUsers.findById(id)
            res.json(ownerById);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
}