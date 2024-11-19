// import { joinCircleService } from "../services/circle.js";

// // join a circle

// export const joinCircle = async (req, res, next) => {
//   // you need the invite code and the user's id
//  try {
//      const { inviteCode } = req.body;
//      const { userId } = req.body;
//      // call service to join circle
//      const results = await joinCircleService(userId, inviteCode);
   
//      if (!results) {
//        return res.status(400).json({ message: "Invalid code" });
//      }
   
//      return res.status(200).json({
//        message: 'Join circle successfully',
//        circle:results
//      })
//  } catch (error) {
//     next(error)
//  }
// };
