import Joi from "joi";

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

// # common schema validation

const emailSchema = Joi.string().email().required().messages({
  "string.empty": "Email is required.!",
  "string.email": "Invalid email format.!",
});

const passwordSchema = Joi.string()
  .pattern(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  )
  .required()
  .messages({
    "string.empty": "Password is required.!",
    "string.pattern.base": "Invalid password format.!",
  });

// # register schema validation

const registerUserSchema = Joi.object({
  fname: Joi.string().min(3).required().messages({
    "string.empty": "First name is required.!",
    "string.min": "First name must be at least 3 characters long.!",
  }),
  lname: Joi.string().required().messages({
    "string.empty": "Last name is required.!",
  }),
  email: emailSchema,
  password: passwordSchema,
});

// # login schema validation

const loginUserSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

export const validateRegister = validator(registerUserSchema);
export const validateLogin = validator(loginUserSchema);