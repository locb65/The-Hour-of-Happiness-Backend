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
    createOwner: async (req, res) => {
        try {
            const newOwner = await RestaurantOwnerUsers.create(req.body);
            res.json(newOwner);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    updateOwner: async (req, res) => {
        try {
            const id = req.params.id;
            const updatedOwner = await RestaurantOwnerUsers.findByIdAndUpdate(id, req.body, {new: true})
        } catch (err) {
            console.error(err)
            res.status(500).json(err);
        }
    },
    deleteOwner: async (req, res) => {
        try {
            const id = req.params.id;
            const deleteOwner = await RestaurantOwnerUsers.findByIdAndDelete(id);
            if (!deleteOwner) {
                res.status(404).json({ error: 'Account not found' });
            }
            res.json({ message: 'Account deleted successfully'})
        } catch (err) {
            console.error(err);
            res.status(500).json(err)
        }
    },
}