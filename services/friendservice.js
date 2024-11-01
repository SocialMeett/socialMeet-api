import { UserModel } from "../models/user.js";
import { FriendRequestModel } from "../models/friendRequest.js";

export const sendFriendRequest = async (sender, receipient) => {
  const friendRequest = await FriendRequestModel.create({
    // create a new friend request document
    sender: sender,
    receipient: receipient,
    
  });
  return friendRequest;
};

export const acceptFriendRequest = async (requestid ) => {
    const acceptFriend = await FriendRequestModel.findByIdAndUpdate({
        requestid
    })
}
