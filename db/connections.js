import mongoose from "mongoose";

const URI = "mongodb://localhost/happyhourdb";
// mongo connections script
mongoose.connect(URI, {
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