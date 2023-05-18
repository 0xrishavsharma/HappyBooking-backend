import { createError } from "./error.js"
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
const token = req.cookies.access_token;
if (!token) return next(createError(401, "You need to login first!"))

jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user; // This will make sure that we can access the user details in the next middleware function
    //or in the controller function if there is no middleware function in between them.
    next();
})
}

export const verifyUser = (req, res, next) => { 
    verifyToken(req, res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){ // Check if the user is admin or the user is accessing their own data.
            next() 
        }else{
            return next(createError(403, "You are not allowed to access other users data!") ) 
        }
    }); // Before we verify user we need to check if they are authenticated/logged in or not
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, ()=> {
        if(req.user.isAdmin){ // Check if the user is admin or the user is accessing their own data.
            next() 
        }else{
            return next(createError(403, "You are not allowed to access other users data!") ) 
        }
    })
}