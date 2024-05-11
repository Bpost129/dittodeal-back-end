import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  listings: [{ type: Schema.Types.ObjectId, ref: 'Listing' }],
  // reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
