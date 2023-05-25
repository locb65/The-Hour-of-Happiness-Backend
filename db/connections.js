import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const MONGO_URI = process.env.MONGO_URI
const DBUSER = process.env.DBUSER
const DBPASS = process.env.DBPASS
const URI = "mongodb://localhost/happyhourdb";
// mongo connections script
mongoose.connect(
    // MONGO_URI,
    `mongodb+srv://${DBUSER}:${DBPASS}@clink-city.ppzbl7l.mongodb.net/?retryWrites=true&w=majority`,
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