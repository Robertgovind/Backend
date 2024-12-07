import mongoose, { mongo, Schema } from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    channel: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Subscriber = mongoose.model("Subscriber", subscriberSchema);
