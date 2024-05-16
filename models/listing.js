import mongoose from "mongoose"

const Schema = mongoose.Schema

// const reviewSchema = new Schema({
//   text: {
//     type: String,
//     required: true,
//   },
//   rating: {
//     type: Number,
//   },
//   author: {
//     type: Schema.Types.ObjectId,
//     ref: 'Profile',
//   },
// }, { timestamps: true })

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
    enum: ['Vehicles', 'Apparel', 'Electronics', 'Entertainment', 'Garden & Outdoor', 'Home Goods', 'Home Improvement', 'Music', 'Office Supplies', 'Pet Supplies', 'Sporting Goods', 'Toys & Games']
  },
  photos: {
    type: [String],
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  },
  // reviews: [reviewSchema]
}, { timestamps: true })

const Listing = mongoose.model('Listing', listingSchema)

export { Listing }