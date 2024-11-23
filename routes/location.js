import { Router } from "express";
import { getLocation } from "../controllers/location.js";
import { isAuthenticated } from "../middlewares/auth.js";


const locationRouter = Router();

locationRouter.get('/users/location/:id', isAuthenticated,getLocation);

export default locationRouter;