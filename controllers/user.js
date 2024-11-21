import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  loginUserValidation,
  registerUserValidation,
  updateProfileValidation,
} from "../validation/user.js";
import { mailTransporter } from "../utils/mail.js";
import { generateEmailTemplate } from "../utils/template.js";

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

    const newUser = await UserModel.create({
      ...value,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_PRIVATE_KEY,

      {
        expiresIn: "24h",
      }
    );

    const emailContent = ` <p>Dear ${value.fullName},<p>
    <p style='color:#E95330;'>Thank you for registering on TrackMeet!`;

   try {
     await mailTransporter.sendMail({
       from: "TrackMeet <trackmeett@gmail.com>",
       to: value.email,
       subject: "User Registration",
       html: generateEmailTemplate(emailContent),
     });
   } catch (mailError) {
    console.error(mailError);
    return res.status(500).json("Error sending email");
   }

    return res
      .status(201)
      .json({ message: "user created successfully", accessToken: token });
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
      return res.status(404).json("Access denied");
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

export const updateProfile = async (req, res, next) => {
  try {
    const { error, value } = updateProfileValidation.validate(req.body, {
      new: true,
    });
    // if error return 422
    if (error) {
      return res.status(422).json(error);
    }
    // update user profile
    const user = await UserModel.findByIdAndUpdate(req.auth.id, value, {
      new: true,
    });

    if (!user) {
      return res.status(404).json("Access denied");
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    // find user by id and populate
    const user = await UserModel.findById(req.auth.id)
      .populate({ path: "circle", select: "name" })
      .select({ password: false });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // retreive circle id from the request body
    // const circleId = req.body;

    // validate circle id if it exists
    // if (!circleId) {
    //   return res.status(400).json({ message: "CircleId is required" });
    // }

    // check if circleID already exists in the users circle
    // if (user.circle.includes(circleId)) {
    //   return res
    //     .status(400)
    //     .json({ message: "circle has been assigned already" });
    // }

    // user.circle.push(circleId);

    // await user.save();

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res, next) => {
  res.json("User Logged Out");
};
