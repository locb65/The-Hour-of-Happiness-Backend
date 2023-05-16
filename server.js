import express from 'express';
import cors from 'cors';
import restaurantRouter from './Routers/Restaurant-Routers.js';
import ownerRouter from './Routers/RestaurantOwnerRouters.js';
import session from "express-session"
import passport from 'passport';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import dotenv from 'dotenv';
import mongoose from './db/connections.js'


const app = express();

const mySecretKey = process.env.SECRET_KEY

const MongoStore = connectMongo(session)

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
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

app.use("/happy-hour-time", restaurantRouter)

app.use("/accounts", ownerRouter);

app.listen(4000, () => {
console.log('The Server is ALIVE on 4000')
}); 