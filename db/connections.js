import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const MONGO_URI = process.env.MONGO_URI
const URI = "mongodb://localhost/happyhourdb";
// mongo connections script
mongoose.connect(
    // MONGO_URI,
    'mongodb+srv://clinkcityadmin:password123456789@clink-city.ppzbl7l.mongodb.net/?retryWrites=true&w=majority',
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to mongodb");
})
// error handler
.catch(err => {
    console.log("Error connecting to mongodb: " + err.message);
});

export default mongoose