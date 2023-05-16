import mongoose from "../db/connections.js"
import RestaurantOwnerUsers from "./restaurantOwnerModel.js";

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
})

const HappyHourSchema = new Schema({
  day: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  deals: {
    type: String,
  },
})

const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: AddressSchema,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  happyHour: {
    type: HappyHourSchema,
    required: true
  },
  menu: {
    type: String,
    required: true
  },
  restaurantImg: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "RestaurantOwnerUsers",
  }
});

export default mongoose.model("Restaurant", RestaurantSchema)