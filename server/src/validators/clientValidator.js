import Joi from "joi";

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const clientSchema = Joi.object({
  pan_number: Joi.string()
    .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN")
    .required()
    .messages({
      "string.pattern.name": "Invalid PAN number format.!.",
      "string.empty": "PAN number is required.!",
    }),
  client_name: Joi.string().min(3).required().messages({
    "string.empty": "Client name is required.!",
    "string.min": "Client name must be at least 3 characters long.!",
  }),
  mobile_number: Joi.string()
    .pattern(/^\d{10}$/, "MOBILE_NUMBER")
    .required()
    .messages({
      "string.pattern.name": "Mobile number must be a valid 10-digit number.!",
      "string.empty": "Mobile number is required.!",
    }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required.!",
  }),
  itr_form_type: Joi.string().required().messages({
    "string.empty": "ITR Form Type is required.!",
  }),
  itr_form_status: Joi.string().required().messages({
    "string.empty": "ITR Form Status is required.!",
  }),
  fee_status: Joi.string().required().messages({
    "string.empty": "Fee Status is required.!",
  }),
  financial_year: Joi.string().required().messages({
    "string.empty": "Financial Year is required.!",
  }),
  assessment_year: Joi.string(),
  // assessment_year: Joi.string().required().messages({
  //   "string.empty": "Assessment Year is required.!",
  // }),
  revised: Joi.boolean(),
  added_by: Joi.string(),
  edited_by: Joi.string(),
});

export const validateClient = validator(clientSchema);
