import { UserModel } from "../models/user.js";

export const addfriend = async (req, res, next) => {
    try {
        // get friend id from url
        const {friendid} = req.params.id;
        // check if friend exists
        const friend = await UserModel.findById(friendid)
    } catch (error) {
        next (error)
    };
    
}
// }

