import Joi from "joi";

export const userRegisterSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const emailSchema = Joi.object({
  email: Joi.string().email().required().lowercase().trim(),
});