import express from 'express';
import cors from 'cors';
import restaurantRouter from './Routers/Restaurant-Routers.js';
import ownerRouter from './Routers/RestaurantOwnerRouters.js';
import session from "express-session"
import passport from 'passport';
import connectMongo from 'connect-mongo';
import dotenv from 'dotenv';
import './Middlewares/Passport.js'

import { checkAuthentication } from './Middlewares/Passport.js';



const app = express();

dotenv.config();

const mySecretKey = process.env.SECRET_KEY
const mongoUrl = "mongodb://localhost/happyhourdb";

const MongoStore = connectMongo.create({ mongoUrl });

const corsOption = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  };
// cors used to allow communication between frontend and backend
app.use(cors(corsOption));
app.use(express.json())

app.use(
  session({
    secret: mySecretKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore,
  })
)

app.use(passport.initialize());
app.use(passport.session());
app.get('/');
app.use("/happy-hour-time", restaurantRouter)

app.use("/accounts", ownerRouter);

app.get('/check-authentication', checkAuthentication, (req, res) => {

});

app.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
  res.json({ message: 'logout' });
  });
});
// handles authentication
app.post('/login', passport.authenticate('local'), (req, res) => {
  // Successful authentication, send a success response
  res.redirect("/");
});


app.listen(4000, () => {
console.log('The Server is ALIVE on 4000')
}); 