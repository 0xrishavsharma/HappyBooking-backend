import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createRoom = async (req, res, next) => {
	const hotelId = req.params.hotelId;
	const newRoom = new Room(req.body);

	try {
		const savedRoom = await newRoom.save();
		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$addToSet: {
					rooms: savedRoom._id,
				},
			});
		} catch (err) {
			next(err);
		}
		res.status(200).json(savedRoom);
	} catch (err) {
		next(err);
	}
};

export const updateRoom = async (req, res, next) => {
	try {
		const updatedRoom = await Room.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedRoom);
	} catch (err) {
		next(err);
	}
};

export const updateRoomAvailability = async (req, res, next) => {
	try {
		// We are not using findById because we need to update the availability of a specific room
		await Room.updateOne(
			{ "roomNumbers._id": req.params.id },
			{
				$push: { "roomNumbers.$.unavailableDates": req.body.dates }, // $ is the positional operator that identifies the correct element in the array and is used when there are nested properties
				$set: { "roomNumbers.$.bookedBy": req.body.bookedBy },
			}
		);
		res.status(200).json("Room status has been updated");
	} catch (err) {
		next(err);
	}
};

export const deleteRoom = async (req, res, next) => {
	const hotelId = req.params.hotelId;

	try {
		await Room.findByIdAndDelete(req.params.id);
		try {
			await Hotel.findByIdAndUpdate(
				hotelId,
				{
					$pull: {
						rooms: req.params.id,
					},
				},
				{
					new: true,
				}
			);
		} catch (err) {
			console.log(err);
			next(err);
		}
		res.status(200).json(`Deleted the Room with id:${req.params.id}`);
	} catch (err) {
		next(err);
	}
};
export const getRoom = async (req, res, next) => {
	try {
		const room = await Room.findById(req.params.id);
		res.status(200).json(room);
	} catch (err) {
		next(err);
	}
};
export const getAllRooms = async (req, res, next) => {
	try {
		const rooms = await Room.find();
		res.status(200).json(rooms);
	} catch (err) {
		console.log(err);
		next(err);
	}
};
