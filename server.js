import express from 'express';
import cors from 'cors';
import restaurantRouter from './Routers/Restaurant-Routers.js';
import ownerRouter from './Routers/RestaurantOwnerRouters.js';
import session from "express-session"
import passport from 'passport';
import connectMongo from 'connect-mongo';
import dotenv from 'dotenv';
import './Middlewares/Passport.js'
import restaurantOwnerUsers from './Models/restaurantOwnerModel.js';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { checkAuthentication } from './Middlewares/Passport.js';
import MongoStore from 'connect-mongo';


dotenv.config();

const mySecretKey = process.env.SECRET_KEY
const cloudinaryName = process.env.CLOUD_NAME
const cloudinarySecret = process.env.CLOUD_API_SECRET_KEY
const cloudinaryAPIKey = process.env.CLOUD_API_KEY

// cloudiary settings
cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryAPIKey,
  api_secret: cloudinarySecret,
});

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
    cookie: { secure: false},
    store: MongoStore.create({
      mongoUrl: mongoUrl,
      autoRemove: 'native'
    }),
  })
)

app.use(passport.initialize());
app.use(passport.session());
app.get('/');
app.use("/happy-hour-time", restaurantRouter)

app.use("/accounts", ownerRouter);

app.get('/check-authentication', checkAuthentication, (req, res) => {
  if (req.isAuthenticated()) {
    console.log(isAuthenticated(req.user));
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
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

app.post('/upload-img', upload.single('file'), (req, res) => {
  const file = req.file
  if(!file) {
    return res.status(400).json({ error: 'No file Uploaded' })
  }
  res.json({ imageUrl: file.path })
})

app.listen(4000, () => {
console.log('The Server is ALIVE on 4000')
}); 