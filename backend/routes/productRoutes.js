import express from "express";
import {
  createProducts,
  getAdminProducts,
  getAllProducts,
} from "../controller/productController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";
const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/product/create")
  .post(verifyUserAuth, roleBasedAccess("admin"), createProducts);

router
  .route("/admin/products")
  .get(verifyUserAuth, roleBasedAccess("admin"), getAdminProducts);

export default router;
