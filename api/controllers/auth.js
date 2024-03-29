import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hash,
		});
		await newUser.save();
		res.status(200).send("User has been created successfully!");
	} catch (err) {
		next(err);
	}
};
export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) return next(createError(404, "User not found"));

		// Checking if the password provided by the user is correct
		const isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (!isPasswordCorrect)
			return next(
				createError(400, "Incorrect password or username, please try again!")
			);

		const token = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWT_SECRET
		); // After generating this token we'll store it in our cookies

		const { isAdmin, password, ...otherDetails } = user._doc;
		res
			.cookie("access_token", token, {
				httpOnly: true, // This will make sure that the cookie is not accessible by the frontend
			})
			.status(200)
			.json({ ...otherDetails });
	} catch (err) {
		next(err);
	}
};
