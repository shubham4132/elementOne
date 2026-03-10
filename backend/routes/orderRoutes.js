import express from "express";
import { verifyUserAuth } from "../middleware/userAuth.js";
import { createOrder } from "../controller/orderController.js";
const router = express.Router();

router.route("/order/cod").post(verifyUserAuth, createOrder);
export default router;
