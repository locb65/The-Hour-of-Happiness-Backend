import passport from "passport";
import LocalStrategy from "passport-local";
import RestaurantOwnerModel from "../Models/restaurantOwnerModel.js";
import bcrypt from  "bcrypt";


// use method for generating a new instacnce of local strategy
passport.use(
    new LocalStrategy.Strategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                // finding the user based on email
                const user = await RestaurantOwnerModel.findOne({ email });
                // checks to see if email exists in db
                if (!user) {
                    return done(null, false, {message: "Email not found"});
                    }
                // compares password input to user password stored in db
                const passwordMatch = await bcrypt.compare(password, user.password);
                // checks if password matches to database password
                if(!passwordMatch) {
                    return done(null, false, {message: "Incorrect Email or Password"});
                    }
                // returns user if email exists and password matches
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ),
)