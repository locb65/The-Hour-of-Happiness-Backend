import mongoose from "../db/connections.js";
import Restaurant from "./Restaurant-Model.js";
import bcrypt from 'bcrypt';

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

// method to check if the password has been modified before creating or updating the document
restaurantOwnerUserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        // salt is for cost factor for hashing a password
        // higher salt = more security but longer hash time
        const salt = await bcrypt.genSalt(10);
        //hashes the password using the salt defined above
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        return next(error);
    }
})
// method for comparing entered password to stored hashed passwords to authentification
restaurantOwnerUserSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error)
    }
}

export default mongoose.model("RestaurantsOwnerUsers", restaurantOwnerUserSchema)