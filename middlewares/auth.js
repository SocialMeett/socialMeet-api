import {expressjwt} from 'express-jwt';
import { UserModel } from '../models/user.js';



export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms:['HS256'],
});


// find the user from the database

// export const findUser = async (req, res, next) => {
//     try {

//         // It's just using the authenticated ID to find the user in the database from the token
//         const user = await UserModel.findById(req.auth.id);

//         // if using is not found return this response
//         if (!user) 
//             return res.status(404).json('User does not exist');

//         // if the user is found resturn this res
//         req.user = user;
//         next()
//     } catch (error) {
//         next(eror)
//     }
// }