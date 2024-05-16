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

async function show(req, res) {
  try {
    const listing = await Listing.findById(req.params.listingId)
      .populate('author')
    res.status(200).json(listing)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function update(req, res) {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.listingId,
      req.body,
      { new: true }
    ).populate('author')
    res.status(200).json(listing)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deleteListing(req, res) {
  try {
    const listing = await Listing.findById(req.params.listingId)
    if (listing.author.equals(req.user.profile)) {
      await Listing.findByIdAndDelete(req.params.listingId)
      const profile = await Profile.findById(req.user.profile)
      profile.listings.remove({ _id: req.params.listingId })
      await profile.save()
      res.status(200).json(listing)
    } else {
      res.status(500).json({error: 'Not Authorized'})
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteListing as delete,

}