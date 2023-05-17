import { createError } from "./error.js"
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
const token = req.cookies.access_token;
if (!token) return next(createError(401, "You need to login first!"))

jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    console.log("User: ", user)
    req.user = user; // This will make sure that we can access the user details in the next middleware function
    //or in the controller function if there is no middleware function in between them.
    next();
})
}

export const verifyUser = (req, res, next) => { 
    verifyToken(req, res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){ // Checking if the searched user is the same as the logged in user because we don't want to give logged in user access to other users data.
            next() 
        }else{
            if(err) return next(createError(403, "You are not allowed to access other users data!") ) 
        }
    }); // Before we verify user we need to check if they are authenticated/logged in or not
}