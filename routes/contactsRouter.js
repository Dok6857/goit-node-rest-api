// contactsRouter

import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

import {
  createContactSchema,
  updateContactSchema,
  patchContactSchema,
} from "../schemas/contactsSchemas.js";

import validateBody from "../helpers/validateBody.js";
import { tokenCheck } from "../middleware/tokenCheck.js";

const contactsRouter = express.Router();

contactsRouter.get("/", tokenCheck, getAllContacts);

contactsRouter.get("/:id", tokenCheck, getOneContact);

contactsRouter.delete("/:id", tokenCheck, deleteContact);

contactsRouter.post(
  "/",
  tokenCheck,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  tokenCheck,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  tokenCheck,
  validateBody(patchContactSchema),
  updateStatusContact
);

export default contactsRouter;
