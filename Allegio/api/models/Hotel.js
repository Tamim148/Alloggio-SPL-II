import mongoose from "mongoose";
import multer from "multer"

const HotelSchema = new mongoose.Schema({
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
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    rooms: {
      type: [String],
    },
    cheapestPrice: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); // Make sure to create a 'uploads' folder in your project root
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });  


  const upload = multer({ storage: storage });

HotelSchema.post('validate', function (doc) {
  if (!doc.photos) {
    doc.photos = [];
  }
});

HotelSchema.methods.addPhotos = function (photos) {
  this.photos = this.photos.concat(photos);
};


  export default mongoose.model("Hotel", HotelSchema)