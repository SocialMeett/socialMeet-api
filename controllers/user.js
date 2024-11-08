import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  loginUserValidation,
  registerUserValidation,
  updateProfileValidation,
} from "../validation/user.js";

export const registerUser = async (req, res, next) => {
  // validate user first
  // if it fails return error
  // check if user already exists, return 409
  // create new user with hashed password for new user
  //
  try {
    const { error, value } = registerUserValidation.validate(req.body);

    if (error) {
      return res.status(422).json(error);
    }

    //  checks if theres a user like this in the db
    const user = await UserModel.findOne({ email: value.email });

    if (user) {
      return res.status(409).json("user already exists");
    }

    const hashedPassword = bcrypt.hashSync(value.password, 10);

    await UserModel.create({
      ...value,
      password: hashedPassword,
    });

    return res.status(201).json("user created successfully");
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  // validate user input
  try {
    const { error, value } = loginUserValidation.validate(req.body);

    if (error) {
      return res.staus(422).json(error);
    }
    const user = await UserModel.findOne({ email: value.email });
    if (!user) {
      return res.staus(404).json("Access denied");
    }
    // compare the password
    const correctPassword = bcrypt.compareSync(value.password, user.password);

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.json({
      message: "Login successful",
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = (req, res, next) => {
  try {
    const { error, value } = updateProfileValidation.validate(req.body);

    res.json("Profile updated");
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.auth.id)
      // .populate("friends fullName location email")
      .select({ password: false });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res, next) => {
  res.json("User Logged Out");
};
