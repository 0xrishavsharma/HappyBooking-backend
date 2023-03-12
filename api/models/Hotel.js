import mongoose from "mongoose";
import { Schema } from "mongoose";

const HotelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    distance: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
    },
    title: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    rooms: {
        type: [String], //because this will include room id's that we'll create in the Room.js module which will be the child of Hotel.js
        required: true,
    },
    cheapestPrice: { //Creating this object because the hotel might have 100's of rooms and searching for the cheapest room can be difficult so the staff can use this parameter to update that
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
})

export default mongoose.model("Hotel", HotelSchema);