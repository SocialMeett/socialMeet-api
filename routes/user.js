import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.js";



// create a router
const userRouter =Router();


// define routes
userRouter.post('/users/register', registerUser),

userRouter.post('/users/login', loginUser)


export default userRouter;


