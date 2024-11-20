import Joi from "joi";

export const registerUserValidation = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  friends: Joi.string().optional(),
  latitude: Joi.number().optional(),
  longitude: Joi.number().optional(),
  role: Joi.string().valid("admin", "member"),
});

export const loginUserValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const updateProfileValidation = Joi.object({
  fullName:Joi.string(),
  password:Joi.string(),
  latitude: Joi.number(),
  longitude: Joi.number(),
  role: Joi.string().valid("admin", "member"),
});
