import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
	const newHotel = new Hotel(req.body);
	try {
		const savedHotel = await newHotel.save();
		res.status(200).json(savedHotel);
	} catch (err) {
		next(err);
	}
};
export const updateHotel = async (req, res, next) => {
	try {
		const updatedHotel = await Hotel.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedHotel);
	} catch (err) {
		next(err);
	}
};
export const deleteHotel = async (req, res, next) => {
	try {
		await Hotel.findByIdAndDelete(req.params.id);
		res.status(200).json(`Deleted the hotel with id:${req.params.id}`);
	} catch (err) {
		next(err);
	}
};
export const getHotel = async (req, res, next) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		res.status(200).json(hotel);
	} catch (err) {
		next(err);
	}
};
export const getAllHotels = async (req, res, next) => {
	try {
		const hotels = await Hotel.find();
		res.status(200).json(hotels);
	} catch (err) {
		console.log(err);
		next(err);
	}
};

export const countByCity = async (req, res, next) => {
	const cities = req.query.cities.split(","); //example query and result: /countByCity/Paris,London,Berlin => [Paris, London, Berlin]
	console.log(cities);
	try {
		const list = await Promise.all(
			cities.map((city) => Hotel.countDocuments({ city: city })) // countDocuments is a mongoose method and it returns a promise
			// so we can use Promise.all to wait for all the promises to resolve and then return the result as an array of numbers (counts)
			// example result: [5, 10, 3] => 5 hotels in Paris, 10 hotels in London, 3 hotels in Berlin
		);
		res.status(200).json(list);
	} catch (err) {
		next(err);
	}
};
