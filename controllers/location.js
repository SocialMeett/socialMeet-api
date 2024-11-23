import { getUsersInCircleService } from "../services/location.js";
import { CircleModel } from "../models/circle.js";
import { UserModel } from "../models/user.js";

// fetch the users location form the database
// prepare data for clustering

export const getLocation = async (req, res, next) => {
  try {
    // get circle from database
    const { id } = req.params;
    // if not circle return error
    console.log(req.params.id)
    // console.log(circleId)
    if (!id) {
      return res.status(400).json({ message: "Circle not found" });
    }
const circleLocation = await CircleModel.findById(id)

const members = circleLocation.toObject().members

 const memberDetails = await UserModel.find({
  _id: { $in: members } 
}).lean();

const response = {
            success: true,
            data: {
                circleName: circleLocation.name,
                members: memberDetails 
            }
};
    // const usersLocation = await getUsersInCircleService(id);
    // // call service to fetch users in the circle
    // if (!usersLocation) {
    //   return res.status(404).json({ message: "Error fetching users location" });
    // }
    // if (!usersLocation.members || usersLocation.members.length === 0) {
    //   return res.status(404).json({ message: "No members found" });
    // }

    return res.status(200).json(response,
    );
  } catch (error) {
    next(error);
  }
};

// import { updateLocationService, pauseLocationService} from "../services/location.js";

// export const updateLocation = (res, req, next) => {
//     const {error, value} = updateLocationValidator.validate(req.body);
//     if (error) {
//         return res.status(422).json(error);
//         const update =await updateLocationService.

//     }
// }
