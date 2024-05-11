import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  },
}, { timestamps: true })

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Clothing', '', '', '', '']
  },
  picture: {
    type: String,
    required: true,
  },
  avgRating: {
    type: Number
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  },
  reviews: [reviewSchema]
}, { timestamps: true })

const Listing = mongoose.model('Listing', listingSchema)

export { Listing }