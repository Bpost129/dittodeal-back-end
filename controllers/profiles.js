import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findById(req.params.id)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findById(req.params.id)
      .populate('reviews.author')
    res.status(200).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function createReview(req, res) {
  try {
    req.body.author = req.user.profile
    const profile = await Profile.findById(req.params.id)
    profile.reviews.push(req.body)
    await profile.save()
    const newReview = profile.reviews.at(-1)
    const currProfile = await Profile.findById(req.user.profile)
    newReview.author = currProfile
    res.status(200).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function updateReview(req, res) {
  try {
    const profile = await Profile.findById(req.params.id)
    const review = profile.reviews.id(req.body._id)
    review.text = req.body.text
    await profile.save()
    res.status(200).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deleteReview(req, res) {
  try {
    const profile = await Profile.findById(req.params.id)
    profile.reviews.remove({ _id: req.params.reviewId })
    await profile.save()
    res.status(200).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

// addFavorite
async function addFavorite(req, res) {
  try {
    // req.body.author = req.user.profile
    const favorite = await Profile.findById(req.params.id)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: {favorites: favorite} },
      { new: true }
    )
    res.status(201).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

// removeFavorite
async function removeFavorite(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)
    profile.favorites.remove({ _id: req.params.id })
    await profile.save()
    res.status(200).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export { 
  index, 
  addPhoto, 
  show,
  createReview,
  updateReview,
  deleteReview,
  addFavorite,
  removeFavorite,

}
