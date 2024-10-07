import mongoose, { Schema } from "mongoose";

const financialYearSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const FinancialYear = mongoose.model("FinancialYear", financialYearSchema);

export default FinancialYear;
