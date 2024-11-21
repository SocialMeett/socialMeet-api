import { Router } from "express";
import { joinCircle, deleteCircle, createCircle, getCircleById } from "../controllers/admin.js";
import { isAuthenticated } from "../middlewares/auth.js";

const circleRouter = Router();

// create circle
circleRouter.post("/circles", isAuthenticated,createCircle);

// delete circle
circleRouter.delete("/circles/:id", isAuthenticated,deleteCircle);
// join circle
circleRouter.post("/circles/join",isAuthenticated,joinCircle);

// get a circle by id
circleRouter.get('/circles/:id', isAuthenticated, getCircleById  )

export default circleRouter;
