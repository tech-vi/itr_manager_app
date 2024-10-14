import crypto from "crypto";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/verifyEmail.js";
import { sendPwdResetLink } from "../utils/resetPassword.js";
import generateJwtToken from "../utils/generateJwtToken.js";
import {
  validateLogin,
  validateRegister,
} from "../validators/userValidator.js";
import { capitalize } from "../utils/helper.js";

const registerUser = async (req, res, next) => {
  const { error, value } = validateRegister(req.body);

  if (error) {
    res.status(400);
    const err = new Error(error.details[0].message);
    return next(err);
  }

  let { fname, lname, email, password } = value;
  fname = capitalize(fname);
  lname = capitalize(lname);

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      const err = new Error("Email is already registered.!");
      return next(err);
    }

    // # create user with verification token

    const verification_token = crypto.randomBytes(32).toString("hex");

    const expDate = new Date();
    const expMinutes = expDate.getMinutes() + 5;
    expDate.setMinutes(expMinutes);
    const verification_token_expiration = expDate;

    const user = await User.create({
      fname,
      lname,
      email,
      password,
      verification_token,
      verification_token_expiration,
    });

    // # send verification email to verify user

    if (user) {
      const verificationEmailResponse = await sendVerificationEmail(
        user.email,
        user.verification_token,
        user.fname
      );
      if (verificationEmailResponse.error) {
        const err = new Error("Failed to send verification link.!");
        res.statusCode = 500;
        return next(err);
      }
      res.status(200).json({ message: "Verification mail sent.!" });
    }
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const loginUser = async (req, res, next) => {
  const { error, value } = validateLogin(req.body);

  if (error) {
    res.status(400);
    const err = new Error(error.details[0].message);
    return next(err);
  }

  const { email, password } = value;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      const err = new Error("Invalid email address.!");
      return next(err);
    }

    if (user.isVerified) {
      const comparePwd = await user.comparePassword(password);

      if (!comparePwd) {
        res.status(400);
        const err = new Error("Invalid password.!");
        return next(err);
      }
      if (user.email === process.env.SUPER_ADMIN_EMAIL && !user.isAdmin) {
        // console.log(user.email, process.env.SUPER_ADMIN_EMAIL);
        user.isAdmin = true;
        await user.save();
      }

      generateJwtToken(res, user._id, "token");

      res.status(200).json({
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        fname: user.fname,
        lname: user.lname,
      });
    } else {
      const verification_token = crypto.randomBytes(32).toString("hex");

      const expDate = new Date();
      const expMinutes = expDate.getMinutes() + 5;
      expDate.setMinutes(expMinutes);
      const verification_token_expiration = expDate;

      user.verification_token = verification_token;
      user.verification_token_expiration = verification_token_expiration;
      await user.save();

      const verificationEmailResponse = await sendVerificationEmail(
        user.email,
        user.verification_token,
        user.fname
      );
      if (verificationEmailResponse.error) {
        const err = new Error("Failed to send verification link.!");
        res.statusCode = 500;
        return next(err);
      }
      res.status(200).json({ message: "Verification mail sent.!" });
    }
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(200).json({ message: "Logged out.!" });
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const emailVerification = async (req, res, next) => {
  const { verification_token } = req.params;

  try {
    const user = await User.findOne({
      verification_token,
      verification_token_expiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token.!" });
    }

    user.isVerified = true;
    user.verification_token = undefined;
    user.verification_token_expiration = undefined;
    await user.save();

    res.status(200).json({ message: "Email verification is done.!" });
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = {
      _id: req.user._id,
      fname: req.user.fname,
      lname: req.user.lname,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
      isVerified: req.user.isVerified,
    };
    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const editUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.fname = req.body.fname || user.fname;
      user.lname = req.body.lname || user.lname;

      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        fname: updatedUser.fname,
        lname: updatedUser.lname,
      });
    } else {
      res.status(404);
      const err = new Error("User not found.!");
      return next(err);
    }
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const editUserRole = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (user) {
      user.isAdmin = req.body.isAdmin ?? user.isAdmin;

      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      const err = new Error("User not found.!");
      return next(err);
    }
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const removeUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const userExists = await User.findById(id);

    if (!userExists) {
      res.status(404);
      const err = new Error("User not found.!");
      return next(err);
    }

    const removedUser = await User.deleteOne({ _id: id });

    if (removedUser) {
      res.status(200).json({ message: "User removed.!" });
    }
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.");
    return next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    const err = new Error("Email is required.!");
    return next(err);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    const err = new Error("Invalid email format.!");
    return next(err);
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      const err = new Error("Invalid email address.!");
      return next(err);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 300,
    });

    const expDate = new Date();
    const expMinutes = expDate.getMinutes() + 5;
    expDate.setMinutes(expMinutes);
    user.reset_password_token = token;
    user.reset_password_token_expiration = expDate;
    await user.save();
    const resetEmailResponse = await sendPwdResetLink(email, token, user.fname);
    if (resetEmailResponse.error) {
      const err = new Error("Failed to send password reset link.!");
      res.statusCode = 500;
      return next(err);
    }
    res.status(200).json({ message: "Password reset mail sent.!" });
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  if (!token) {
    const err = new Error("Invalid token.!");
    res.statusCode = 500;
    return next(err);
  }

  if (!password) {
    const err = new Error("Bad request, password is missing.!");
    res.statusCode = 400;
    return next(err);
  }

  try {
    const user = await User.findOne({
      reset_password_token: token,
      reset_password_token_expiration: { $gt: Date.now() },
    });

    if (!user) {
      const err = new Error(
        "Password reset link is invalid or expired. Please try again.!"
      );
      res.statusCode = 404;
      return next(err);
    }
    user.password = password;
    user.reset_password_token = undefined;
    user.reset_password_token_expiration = undefined;
    await user.save();
    res.status(200).json({
      message: "Password updated successfully. Please login to continue.!",
    });
  } catch (error) {
    res.status(500);
    const err = new Error("Internal Server Error.!");
    return next(err);
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  emailVerification,
  getUsers,
  getUser,
  editUser,
  editUserRole,
  removeUser,
  forgotPassword,
  resetPassword,
};
