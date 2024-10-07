import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  emailVerification,
  getUsers,
  getUser,
  editUser,
  removeUser,
  editUserRole,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";
import { verifyJwtToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/verify_email/:verification_token", emailVerification);

router.post("/forgot_pwd", forgotPassword);

router.put("/reset_pwd/:token", resetPassword);

router.get("/", getUsers);

router.get("/profile", verifyJwtToken, getUser);

router.put("/profile", verifyJwtToken, editUser);

router.patch("/profile/:id", editUserRole);

router.delete("/profile/:id", removeUser);

export default router;
