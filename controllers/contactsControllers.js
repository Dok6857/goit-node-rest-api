import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      throw HttpError(404);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedContact = await removeContact(id);
    if (removedContact) {
      res.status(200).json(removedContact);
    } else {
      throw HttpError(404);
    }
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const schema = createContactSchema.validate(req.body)
    const { name, email, phone } = req.body;
    if (schema.error) {
      throw HttpError(400, schema.error.message)
    }
    const newContact = await addContact(name, email, phone)
    res.status(201).json(newContact)
  } catch (error) {
    next(error)
  }
};

export const updateContact = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
};
