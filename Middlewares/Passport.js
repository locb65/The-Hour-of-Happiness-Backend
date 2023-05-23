import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import RestaurantOwnerUsers from "../Models/restaurantOwnerModel.js";
import bcrypt from  "bcrypt";


// use method for generating a new instacnce of local strategy
passport.use(
    new LocalStrategy (
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                // finding the user based on email
                const user = await RestaurantOwnerUsers.findOne({ email });
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

// need to set up user serializers using passport


// passport.serializeUser ((user, cb) => {
//     cb(null, user.id)
// })

// passport.deserializeUser ((id, cb) => {
//     RestaurantOwnerUsers.findOne({_id: id}, (err, user) => {
//         cb(err, user)
//     });
// })

passport.serializeUser((user, done) => {
    done(null, user.id)
});


// method for using id to retrieve user from serializer above
passport.deserializeUser(async(id, done) => {
    try {
        const user = await RestaurantOwnerUsers.findById(id);
        if(user) {
        done(null, user)
        } else {
        done(null, false);
        }
    } catch (error) {
        done(error);
    }
});

export const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        // User is authenticated and active
        res.json({ authenticated: true });
      } else {
        // User is not authenticated or session has expired
        res.json({ authenticated: false });
      }
}