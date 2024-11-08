import { expressjwt } from "express-jwt";
import { UserModel } from "../models/user.js";
import { permissions } from "../utils/rbac.js";

export const isAuthenticated = expressjwt({
  secret: process.env.JWT_PRIVATE_KEY,
  algorithms: ["HS256"],
});

export const hasPermission = (action) => {
  return async (req, res, next) => {
    // find the user in the database
    try {
      if (!req.auth) {
        return res.status(401).json('unauthorized');
      }
      const user = await UserModel.findById(req.auth.id);
      // use member role to find what permission they can take
      const permission = permissions.find((value) => value.role === user.role);
      if (!permission) {
        return res.status(403).json("no permission found");
      }
      // check if permission action includes the action
      // console.log(permission)
      if (permission.actions.includes(action)) {
        next();
      } else {
        res.status(403).json("Action not allowed");
      }
      // console.log(req.auth);
    } catch (error) {
      next(error);
    }
  };
};
