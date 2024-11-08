import { Router } from "express";
import { joinCircle, deleteCircle, createCircle } from "../controllers/admin.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";

const circleRouter = Router();

// create circle
circleRouter.post("/circles", isAuthenticated, hasPermission("create_circle"),createCircle);

// delete circle
circleRouter.delete("/circles/:id", isAuthenticated,hasPermission("delete_circle"),deleteCircle);
// join circle
circleRouter.post("/circles/:id/join",isAuthenticated,hasPermission("join_circle"),joinCircle);

export default circleRouter;