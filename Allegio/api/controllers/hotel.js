
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
export const createHotel = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);
    let photos = [];

    // Check if req.files is defined and not empty
    if (req.files && req.files.length > 0) {
      // Take the first file if there are multiple files
      photos = req.files.map((file) => file.path);
    }

    const newHotel = new Hotel({
      name: req.body.name,
      address: req.body.address,
      cheapestPrice: req.body.cheapestPrice,
      city: req.body.city,
      desc: req.body.desc,
      distance: req.body.distance,
      featured: req.body.featured,
      title: req.body.title,
      type: req.body.type,
      rooms: req.body.rooms,
      photos: photos 
    });

    const savedHotel = await newHotel.save();
    console.log("Saved Hotel:", savedHotel);

    res.status(200).json(savedHotel);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
  export const updateHotel = async (req, res, next) => {
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      console.log(req.params.id)
      res.status(200).json(updatedHotel);
    } catch (err) {
      next(err);
    }
  };
  export const deleteHotel = async (req, res, next) => {
    try {
      await Hotel.findByIdAndDelete(req.params.id);
      console.log(req.params.id)
      res.status(200).json("Hotel has been deleted.");
    } catch (err) {
      next(err);
    }
  };
  export const getHotel = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      console.log(hotel, )
      res.status(200).json(hotel);
    } catch (err) {
      next(err);
    }
  };
  export const getHotels = async (req, res, next) => {
    const { min, max,limit, ...others } = req.query;
    
    try {
      console.log(others)
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 9999999 },
      }).limit(req.query.limit);
      console.log(hotels)
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };

  export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };


  export const countByType = async (req, res, next) => {
    const cities = req.query.types.split(",");
    try {
      const list = await Promise.all(
        cities.map((type) => {
          return Hotel.countDocuments({ type: type });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };

  export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };


 