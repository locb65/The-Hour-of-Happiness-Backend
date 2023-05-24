import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const MONGO_URI = process.env.MONGO_URL
const URI = "mongodb://localhost/happyhourdb";
// mongo connections script
mongoose.connect(MONGO_URI || URI, {
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