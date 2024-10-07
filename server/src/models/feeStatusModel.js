import mongoose, { Schema } from "mongoose";

const feeStatusSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const FeeStatus = mongoose.model("FeeStatus", feeStatusSchema);

export default FeeStatus;
