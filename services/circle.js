import { CircleModel } from "../models/circle.js";
import { UserModel } from "../models/user.js";
import crypto from "crypto";

// create a circle
export const createCircleService = async (userId, circleName) => {
  // find the user creating the circle,

  const user = await UserModel.findById(userId);
  if (!user) {
    return { error: "User not found" };
  }

  // generate a unique invite code
  const inviteCode = crypto.randomBytes(4).toString("hex");
  // create a new circle
  const newCircle = await CircleModel.create({
    name: circleName,
    // user._id refers to the person who creates a circle becomes an admin
    admin: user._id,
    members: [user._id],
    inviteCode,
    // const inviteCodeMail = () => {}
  });

  return newCircle;
};

// to join a circle

export const joinCircleService = async (userId, inviteCode) => {
  // find circle
  const circle = await CircleModel.findOne({
    inviteCode,
  });
  // console.log(circle);

  if (!circle) {
    return { error: "invite code not found" };
  }
  // check if user is already member
  const existingMember = await CircleModel.findOne({
    _id: circle._id,
    members: userId,
  });
  // add user to circle members
  if (existingMember) {
    return { error: "User is already a member" };
  }

  //   add user to circle
  circle.members.push(userId);

  // save the circle
  await circle.save();

  // Update user's circle array
  await UserModel.findByIdAndUpdate(
    userId,
    { $addToSet: { circle: circle._id } },
    { new: true }
  );

  return { message: "User added to the circle successfully", circle };
};

// delete a circle
export const deleteCircleService = async (circleId) => {
  const circle = await CircleModel.findByIdAndDelete(circleId);
  if (!circle) {
    return { error: "circle not found" };
  }
  return { message: "Circle was deleted successfully" };
};

export const getCircleService = async (circleId) => {
  const getCircle = await CircleModel.findById(circleId).populate({path:'admin',
    select:'fullName'
  })
  .populate({
    path: "members",
    select: "fullName email latitude longitude ",
  }).select({
    password: false,
  })
  // check if circle is found
  if (!getCircle) {
    return { error: "Circle not found" };
  }
  return getCircle;
  // add circle name to response
  // circleId.name.push()
};

// add a member to the circle

// export const addCircleService = async (userid, inviteCode) => {
//   // /find circle with invite code, through the model
//   try {
//     const circle = await CircleModel.findOne({ inviteCode });
//     if (!circle) {
//       return {
//         error: "circle not found",
//       };
//     }

//     // add user to the members array
//     const isMember = circle.members.includes(userid);
//     if (isMember) {
//       return {
//         error: "User already a member",
//       };
//       // add user to the circle, thorugh members array
//     }

//     circle.members.push(userId);
//     // save the circle
//     await circle.save();
//     // return message
//     return { message: "User added to the circle successfully", circle };
//   } catch (error) {
//     next(error);
//   }
// };