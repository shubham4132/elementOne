import express from "express";
import {
  toggleWishlist,
  getWishlist,
} from "../controller/wishlistController.js";

import { verifyUserAuth } from "../middleware/userAuth.js";
const router = express.Router();

router.get("/wishlist", verifyUserAuth, getWishlist);
router.post("/wishlist/:productId", verifyUserAuth, toggleWishlist);

export default router;
