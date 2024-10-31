import { Schema, model } from "mongoose";

// create variable to define friendRequest schema
// answers who sent the request
// who received the friend request
// status of the request

const friendRequestSchema = new Schema({
    senderId: {type: Types.ObjectId, ref: 'User'},
    receiverId:{type: Types.ObjectId, ref: 'User'},
    status: {type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending'}
},
{
    timestamps:true

});
export const FriendRequestModel = model ('FriendRequest', friendRequestSchema);

