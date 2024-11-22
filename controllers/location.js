import { getUsersInCircleService } from "../services/location.js";




// fetch the users location form the database
// prepare data for clustering 




export const getLocation = async (req,res,next) => {
    try {
        // get circle from database
        // const
        // if not circle return error
        // call service to fetch users in the circle 
       
       
    } catch (error) {
        next(error)
    }
    
}





















// import { updateLocationService, pauseLocationService} from "../services/location.js";


// export const updateLocation = (res, req, next) => {
//     const {error, value} = updateLocationValidator.validate(req.body);
//     if (error) {
//         return res.status(422).json(error);
//         const update =await updateLocationService.

//     }
// }

