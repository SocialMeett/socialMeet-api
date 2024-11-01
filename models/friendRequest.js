import { Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const friendRequestSchema = new Schema(
  {
    sender: { type: Types.ObjectId, ref: "user", required: true },
    receipient: { type: Types.ObjectId, ref: "user", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

friendRequestSchema.plugin(toJSON);

export const FriendRequestModel = model("FriendRequest", friendRequestSchema);
