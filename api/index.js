import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log("Connected to MongoDB!");
	} catch (error) {
		throw error;
	}
};

mongoose.connection.on("disconnected", () => {
	console.log("MongoDB Disconnected :(");
});
mongoose.connection.on("connected", () => {
	console.log("MongoDB Connected :)");
});

// Middleware
// Are important because of their ability to reach "req" and "res" before sending anything to user.
// This was we can intercept the user request and send something else instead of the original request.
app.use(cors());
app.use(cookieParser());
app.use(express.json()); // As we can't send JSON objects to an express server. This will helps us the do that.

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

// Error handling middleware
app.use((err, req, res, next) => {
	let errorStatus = err.status || 500;
	let errorMessage = err.message || "Something went wrong!";
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	});
});

// Creating an API
app.get("/", (req, res) => {
	res.send("Hello user :)");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
	connect();
	console.log(`Server successfully listening at ${port}!`);
});
