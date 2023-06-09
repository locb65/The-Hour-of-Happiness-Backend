import Restaurant from "../Models/Restaurant-Model.js";
import RestaurantOwnerUsers from "../Models/restaurantOwnerModel.js";
import GeneralUsers from "../Models/userModel.js";
import data from "./data.json" assert {type: 'json'}

const seedDataBase = async () => {
    try {
        // delete any existing restaurants then inserts a new batch of data
        await Restaurant.deleteMany({});

        await Restaurant.insertMany(data);

        await RestaurantOwnerUsers.deleteMany({});

        await RestaurantOwnerUsers.insertMany();

        console.log("seeded data successfully");
        // termination method indicating success
        process.exit(0);
    } catch (error) {
        console.log(error.message);
        // termination method indicating error occurred
        process.exit(1);
    }
}

seedDataBase();
