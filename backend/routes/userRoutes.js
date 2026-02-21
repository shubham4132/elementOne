import express from "express";
import {
  registerUser,
  loginUser,
  getUserDetails,
  logout,
} from "../controller/userController.js";
import { verifyUserAuth } from "../middleware/userAuth.js";
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/profile").get(verifyUserAuth, getUserDetails);
export default router;
