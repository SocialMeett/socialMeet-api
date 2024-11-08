import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const circleSchema = new Schema(
  {
    name: { type: String, required: true },
    admin:{type: Types.ObjectId, ref:'User', required: true},
    inviteCode: String,
  },
  {
    timestamps: true,
  }
);

circleSchema.plugin(toJSON);

export const CircleModel = model("Circle", circleSchema);

// the admin for the person who first creates the circle
// an array memebers to be able to add more than one friend
