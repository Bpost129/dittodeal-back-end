import { Router } from "express"
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"
import * as listingCtrl from "../controllers/listings.js"

const router = Router()

router.use(decodeUserFromToken)
router.get('/', listingCtrl.index)
router.get('/:listingId', checkAuth, listingCtrl.show)
router.post('/', checkAuth, listingCtrl.create)
// router.post('/:listingId/reviews', checkAuth, listingCtrl.createReview)
router.put('/:listingId', checkAuth, listingCtrl.update)
// router.put('/:listingId/reviews', checkAuth, listingCtrl.updateReview)
router.delete('/:listingId', checkAuth, listingCtrl.delete)
// router.delete('/:listingId/reviews/:reviewId', checkAuth, listingCtrl.deleteReview)

export { router }