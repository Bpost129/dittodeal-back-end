import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

/*---------- Public Routes ----------*/

router.get('/:id', profilesCtrl.show)

/*---------- Protected Routes ----------*/

router.use(decodeUserFromToken)
router.get('/', profilesCtrl.index)
router.post('/:id', checkAuth, profilesCtrl.addFavorite)
router.post('/:id/reviews', checkAuth, profilesCtrl.createReview)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)
router.put('/:id/reviews', checkAuth, profilesCtrl.updateReview)
router.delete('/:id', checkAuth, profilesCtrl.removeFavorite)
router.delete('/:id/reviews/:reviewId', checkAuth, profilesCtrl.deleteReview)

export { router }
