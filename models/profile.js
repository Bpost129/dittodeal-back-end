import mongoose from 'mongoose'

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

const profileSchema = new Schema({
  name: String,
  photo: String,
  avgRating: {type: Number, default: 0},
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  listings: [{ type: Schema.Types.ObjectId, ref: 'Listing' }],
  reviews: [reviewSchema]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
