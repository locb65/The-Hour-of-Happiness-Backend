import express from 'express';
import cors from 'cors';
import restaurantRouter from './Routers/Restaurant-Routers.js';
import ownerRouter from './Routers/RestaurantOwnerRouters.js';
import session from "express-session"
import passport from 'passport';
// import connectMongo from 'connect-mongo';
import dotenv from 'dotenv';
import './Middlewares/Passport.js'
import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { checkAuthentication } from './Middlewares/Passport.js';
import MongoStore from 'connect-mongo';


dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY
const cloudinaryName = process.env.CLOUD_NAME
const cloudinarySecret = process.env.CLOUD_API_SECRET_KEY
const cloudinaryAPIKey = process.env.CLOUD_API_KEY
const MONGO_URI = process.env.MONGO_URI

const DBUSER = process.env.DBUSER
const DBPASS = process.env.DBPASS

// cloudiary settings
cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryAPIKey,
  api_secret: cloudinarySecret,
});

// Cloudinary Storage settings using multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'uploads',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }],
});

const upload = multer({storage: storage})

const app = express();



const mongoUrl = "mongodb://localhost/happyhourdb";

// const MongoStore = connectMongo.create({ mongoUrl });


// const MongoStore = connectMongo.create({ mongoUrl });

// cors options
const corsOption = {
    origin: ["https://clinkcity.netlify.app", "https://loc-deploy--clinkcity.netlify.app"],
    credentials: true,
    optionSuccessStatus: 200,
  };


// cors used to allow communication between frontend and backend
app.use(cors(corsOption));

// built in express body parser
app.use(express.json())

// passport session options
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true},
    store:
     MongoStore.create({
      // mongoUrl: MONGO_URI,
      mongoUrl: `mongodb+srv://${DBUSER}:${DBPASS}@clink-city.ppzbl7l.mongodb.net/?retryWrites=true&w=majority`,
      autoRemove: 'native'
    }),
  })
)
// starts passport session
app.use(passport.initialize());
app.use(passport.session());


// base route for restaurants
app.use("/happy-hour-time", restaurantRouter)


// base route for user accounts
app.use("/accounts", ownerRouter);


//for authenticating sessions for persisting data. currently not working as intended
app.get('/check-authentication', checkAuthentication, (req, res) => {
  if (req.isAuthenticated()) {
    console.log(isAuthenticated(req.user));
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});


// passport.js built in logout functionality
app.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
  res.json({ message: 'logout' });
  });
});
// passport built in functionality that handles authentication and logging in
app.post('/login', passport.authenticate('local'), (req, res) => {
  if (req.user) {
    res.json({ message: "Authentication successful", user: req.user });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
});

// app.post('/login', (req, res, next) => {
//   passport.authenticate('local', (err, user, info) =>{
//     if(err) throw err;
//     if(!user) res.send("no User Found");
//     else{
//       req.logIn(user, err => {
//         if(err) throw err;
//         res.json(req.user)
//         console.log(req.user)
//       })}
//   })(req, res, next)
// })


// route for uploading images. May not need this due to using Cloudinary instead
app.post('/upload-img', upload.single('file'), (req, res) => {
  const file = req.file
  if(!file) {
    return res.status(400).json({ error: 'No file Uploaded' })
  }
  res.json({ imageUrl: file.path })
})

app.listen(process.env.PORT || 4000, () => {
console.log('The Server is ALIVE!')
}); 