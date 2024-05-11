import { Listing } from "../models/listing.js"
import { Profile } from "../models/profile.js"

async function create(req, res) {
  try {
    req.body.author = req.user.profile
    const listing = await Listing.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: {listings: listing} },
      { new: true }
    )
    listing.author = profile
    res.status(201).json(listing)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function index(req, res) {
  try {
    const listings = await Listing.find({})
      .populate('author')
      .sort({ createdAt: 'desc' })
    res.status(200).json(listings)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
  create,
  index,

}