import mongoose from "mongoose";
import { Schema } from "mongoose";

const RoomSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		maxPeople: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		roomNumbers: [
			{ number: Number, unavailableDates: { type: [Date], bookedBy: String } },
		],
	},
	{ timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
