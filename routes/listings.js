import { Router } from "express"
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"
import * as listingCtrl from "../controllers/listings.js"

const router = Router()

/*---------- Public Routes ----------*/

router.get('/', listingCtrl.index)
router.get('/:listingId', listingCtrl.show)

/*---------- Protected Routes ----------*/

router.use(decodeUserFromToken)
router.post('/', checkAuth, listingCtrl.create)
router.put('/:listingId', checkAuth, listingCtrl.update)
router.delete('/:listingId', checkAuth, listingCtrl.delete)

export { router }