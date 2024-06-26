// contactsSchemas

import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
})
  .min(1)
  .message("Body must have at least one field");

export const patchContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
