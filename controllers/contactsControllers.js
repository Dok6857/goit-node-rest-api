// contactControllers

import {
  listContacts,
  getContactById,
  rewriteContact,
  addContact,
  removeContact,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (_, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts).status(200);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw HttpError(400, 'Invalid contact ID');
    }

    const contactToFind = await getContactById(id);

    if (!contactToFind) {
      throw HttpError(404);
    }

    res.json(contactToFind).status(200);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw HttpError(400, 'Invalid contact ID');
    }

    const contactToDelete = await removeContact(id);

    if (!contactToDelete) {
      throw HttpError(404);
    }

    res.json(contactToDelete).status(200);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const addedContact = await addContact(req.body);
    res.json(addedContact).status(201);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw HttpError(400, 'Invalid contact ID');
    }

    const updatedContact = await rewriteContact(id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });

    if (!updatedContact) {
      throw HttpError(404);
    }

    res.json(updatedContact).status(200);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw HttpError(400, 'Invalid contact ID');
    }

    const updatedContact = await rewriteContact(contactId, {
      favorite: req.body.favorite,
    });

    if (!updatedContact) {
      throw HttpError(404);
    }

    res.json(updatedContact).status(200);
  } catch (error) {
    next(error);
  }
};