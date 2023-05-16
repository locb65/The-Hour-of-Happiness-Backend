import express from 'express';
import cors from 'cors';
import restaurantRouter from './Routers/Restaurant-Routers.js';
import ownerRouter from './Routers/RestaurantOwnerRouters.js';
import session from "express-session"
import passport from 'passport';
import connectMongo from 'connect-mongo';
import dotenv from 'dotenv';
import mongoose from './db/connections.js'


const app = express();

dotenv.config();

const mySecretKey = process.env.SECRET_KEY
const mongoUrl = "mongodb://localhost/happyhourdb";

const MongoStore = connectMongo.create({ mongoUrl });

const corsOption = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  };
// cors used to allow communication between frontend and backend
app.use(cors(corsOption));
// parses the data
app.use(express.json())

app.use(
  session({
    secret: mySecretKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore,
  })
)

app.use("/happy-hour-time", restaurantRouter)

app.use("/accounts", ownerRouter);

// handles authentication
app.post('/login', passport.authenticate('local'), (req, res) => {
  // Successful authentication, send a success response
  res.json({ message: 'Authentication successful' });
});

app.listen(4000, () => {
console.log('The Server is ALIVE on 4000')
}); 