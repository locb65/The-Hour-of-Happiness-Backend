import express from 'express';
import cors from 'cors';
import restaurantRouter from './Routers/Restaurant-Routers.js';

const app = express();

const corsOption = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  };
// cors used to allow communication between frontend and backend
app.use(cors(corsOption));
// parses the data
app.use(express.json())

app.use("/HappyHourTime", restaurantRouter)

app.listen(4000, () => {
console.log('The Server is ALIVE on 4000')
}); 