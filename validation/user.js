import Joi from "joi";

export const registerUserValidation = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  friends: Joi.string().optional(),
  location: Joi.string().required(),
  role: Joi.string().valid("admin", "member"),
});

export const loginUserValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const updateProfileValidation = Joi.object({
  location: Joi.string(),
  role: Joi.string().valid("admin", "member"),
});
