import express from "express";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";
import {
  allMyOrders,
  createOrder,
  getAllOrders,
} from "../controller/orderController.js";
const router = express.Router();

router.route("/order/cod").post(verifyUserAuth, createOrder);
router.route("/orders/user").get(verifyUserAuth, allMyOrders);

router
  .route("/admin/orders")
  .get(verifyUserAuth, roleBasedAccess("admin"), getAllOrders);
export default router;
