import Restaurant from "../Models/Restaurant-Model.js";


// full CRUD controllers... Basic setup
const restaurantControllers = {
    getALLRestaurants: async (req, res) => {
        try {
            const allRestaurants = await Restaurant.find();
            res.json(allRestaurants)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    findRestaurantbyID: async (req, res) => {
        try {
            const id = req.params.id;
            const restaurantByID = await Restaurant.findById(id)
            res.json(restaurantByID);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    addRestaurant: async (req, res) => {
        try {
            const newRestaurant = await Restaurant.create(req.body);
            res.json(newRestaurant);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    updateRestaurant: async (req, res) => {
        try {
            const id = req.params.id;
            const restaurant = await Restaurant.findByIdAndUpdate(id, req.body, { new: true });
            res.json(restaurant);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    deleteRestaurant: async (req, res) => {
        try {
            const id = req.params.id;
            const deleteRestaurant = await Restaurant.findByIdAndDelete(id)
            res.json(deleteRestaurant)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}   