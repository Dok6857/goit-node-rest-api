import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

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
    next(error)
  }
  
};

export const deleteContact = async (req, res) => {};

export const createContact = async (req, res) => {};

export const updateContact = async (req, res) => {};
