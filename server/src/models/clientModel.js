import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema(
  {
    pan_number: { type: String, required: true },
    client_name: { type: String, required: true },
    mobile_number: { type: String, required: true },
    password: { type: String, required: true },
    assessment_year: { type: String, required: true },
    financial_year: {
      type: Schema.Types.ObjectId,
      ref: "FinancialYear",
      required: true,
    },
    itr_form_type: {
      type: Schema.Types.ObjectId,
      ref: "ITRFormType",
      required: true,
    },
    itr_form_status: {
      type: Schema.Types.ObjectId,
      ref: "ITRFormStatus",
      required: true,
    },
    fee_status: {
      type: Schema.Types.ObjectId,
      ref: "FeeStatus",
      required: true,
    },
    revised: { type: Boolean, default: false },
    added_by: { type: Schema.Types.ObjectId, ref: "User" },
    edited_by: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
