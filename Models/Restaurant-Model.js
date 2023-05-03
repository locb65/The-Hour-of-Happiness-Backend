import mongoose from "../db/connections.js"
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    phone: String,
    happyHour: String,
    menu: String,
    restaurantImg: String
  });
  
export default mongoose.model("Restaurant", RestaurantSchema)