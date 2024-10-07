import mongoose, { Schema } from "mongoose";

const itrFormStatusSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const ITRFormStatus = mongoose.model("ITRFormStatus", itrFormStatusSchema);

export default ITRFormStatus;
