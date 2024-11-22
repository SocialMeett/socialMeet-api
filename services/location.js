import { CircleModel } from '../models/circle.js'
import {UserModel} from '../models/user.js'


// fetch user locations:latitude andlongitude from database
export const getUsersInCircleService = async (circleId) => {try {
    
        // fetch all users in a specific circle
        // find the circle by id and populate with the members coordinates
        const circleLocation = await CircleModel.findById(circleId).populate({path:'members',
            select:'fullName latitude longitude'
        }).select('name members')
        
        // return the circle with ,members details
        return circleLocation;
} catch (error) {
    
}
}