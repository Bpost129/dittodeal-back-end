import { Router } from "express"
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"
import * as listingCtrl from "../controllers/listings.js"

const router = Router()

router.use(decodeUserFromToken)
router.get('/', listingCtrl.index)
router.post('/', checkAuth, listingCtrl.create)

export { router }