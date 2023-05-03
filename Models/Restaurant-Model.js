import mongoose

from "mongoose";
const restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    phone: String,
    happyHour: String,
    menu: String,
    restaurantImg: String
  });
  
  const Restaurant = mongoose.model('Restaurant', restaurantSchema);
  export default Restaurant;