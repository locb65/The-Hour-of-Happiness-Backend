import mongoose from "../db/connections.js";
import Restaurant from "./Restaurant-Model.js";

const Schema = mongoose.Schema()

const UserSchema = new Schema({
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true, 
        unique: true,
    },
    password: {
        type: String,
        required: true, 
    },
    favorites: [{
        // setting objectId to type to reference a users favorite happy hour places later
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }]
})

export default mongoose.model('User', UserSchema)