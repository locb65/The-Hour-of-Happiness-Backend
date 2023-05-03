import mongoose from "mongoose";

const URI = "mongodb://localhost/happyhourdb";

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => {
    console.log("Connected to mongodb");
})
.catch(err => {
    console.log("Error connecting to mongodb: " + err.message);
});