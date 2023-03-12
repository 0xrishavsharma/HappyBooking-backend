import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"

const app = express();
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected :(")
})
mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected :)")
})

//Middleware
app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)


// Creating an API
app.get("/", (req, res) => {
    res.send("Hello user :)")
})

app.listen(8800, () => {
    connect()
    console.log("Server successfully listening!")
})