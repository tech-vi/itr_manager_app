import mongoose, { Schema } from "mongoose";

const itrFormTypeSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const ITRFormType = mongoose.model("ITRFormType", itrFormTypeSchema);

export default ITRFormType;
