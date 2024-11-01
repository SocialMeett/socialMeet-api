import { Router } from "express";
import { getUserProfile, loginUser, logoutUser, registerUser, updateProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";



// create a router
const userRouter =Router();


// define routes
userRouter.post('/users/register', registerUser),

userRouter.post('/users/login', loginUser),

userRouter.get('/users/me', isAuthenticated, getUserProfile),

userRouter.patch('/users/me', isAuthenticated ,updateProfile),

userRouter.get('/users/logout', isAuthenticated, logoutUser)




export default userRouter;


