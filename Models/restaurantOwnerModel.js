import mongoose from "../db/connections.js";
import Restaurant from "./Restaurant-Model.js";

const Schema = mongoose.Schema;

const restaurantOwnerUserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // restaurants: [{
    //     // to reference the users own restaurants later to have full crud on it
    //     type: Schema.Types.ObjectId,
    //     ref: "Restaurant"
    // }]
})

export default mongoose.model("RestaurantsOwnerUsers", restaurantOwnerUserSchema)