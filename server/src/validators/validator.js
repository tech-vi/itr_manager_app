import Joi from "joi";

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

// # itr form type schema validation

const itrFormTypeSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required.!",
  }),
});

// const itrFormTypeSchema = Joi.object({
//   title: Joi.string()
//     .pattern(/^ITR-\d+$/)
//     .required()
//     .messages({
//       "string.empty": "Title is required.!",
//       "string.pattern.base": "Title must follow the 'ITR-*' pattern.!",
//     }),
// });

// # itr form status schema validation

const itrFormStatusSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required.!",
  }),
});

// # fee status schema validation

const feeStatusSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required.!",
  }),
});

// # financial year schema validation

const financialYearSchema = Joi.object({
  title: Joi.string()
    .pattern(/^20\d{2}-20\d{2}$/)
    .required()
    .custom((value, helpers) => {
      const years = value.split("-");
      const startYear = parseInt(years[0], 10);
      const endYear = parseInt(years[1], 10);

      if (endYear !== startYear + 1) {
        return helpers.message("Invalid financial year.!");
      }
      return value;
    })
    .messages({
      "string.empty": "Financial Year is required.!",
      "string.pattern.base":
        "Financial year must follow the '20xx-20xx' pattern.!",
    }),
});

export const validateITRFormType = validator(itrFormTypeSchema);
export const validateFinancialYear = validator(financialYearSchema);
export const validateITRFormStatus = validator(itrFormStatusSchema);
export const validateFeeStatus = validator(feeStatusSchema);
