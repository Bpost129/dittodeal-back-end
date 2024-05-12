import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.get('/:id', checkAuth, profilesCtrl.show)
router.post('/:id/reviews', checkAuth, profilesCtrl.createReview)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)
router.put('/:id/reviews', checkAuth, profilesCtrl.updateReview)
router.delete('/:id/reviews/:reviewId', checkAuth, profilesCtrl.deleteReview)

export { router }
