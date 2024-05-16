import mongoose from "mongoose"

const Schema = mongoose.Schema

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
}, { timestamps: true })

const Listing = mongoose.model('Listing', listingSchema)

export { Listing }