import express from 'express';
import cors from 'cors';
import restaurantRouter from './Routers/Restaurant-Routers.js';
import ownerRouter from './Routers/RestaurantOwnerRouters.js';
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

app.use("/happy-hour-time", restaurantRouter)

app.use("/accounts", ownerRouter);

app.listen(4000, () => {
console.log('The Server is ALIVE on 4000')
}); 