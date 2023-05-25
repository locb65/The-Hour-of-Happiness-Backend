import Restaurant from "../Models/Restaurant-Model.js";


// full CRUD controllers... Basic setup
export const restaurantControllers = {
    getALLRestaurants: async (req, res) => {
        try {
            const { search } = req.query;
            let allRestaurants;
      
            if (search) {
              allRestaurants = await Restaurant.find({ name: { $regex: search, $options: 'i' } });
            } else {
              allRestaurants = await Restaurant.find();
            }
            res.json(allRestaurants);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    searchRestaurantsByName: async (req, res) => {
        try {
            const { name } = req.query;
            if (name === "") {
                const allRestaurants = await Restaurant.find();
                res.json(allRestaurants);
            } else {
                const decodedName = decodeURI(name);
                const restaurants = await Restaurant.find({
                    name: { $regex: new RegExp(decodedName, "i") },
            });
            res.json(restaurants);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    findRestaurantbyID: async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Invalid restaurant ID" });
              }
            const restaurantByID = await Restaurant.findById(id);
              if (!restaurantByID) {
                return res.status(404).json({ message: "Restaurant not found" });
                }
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


