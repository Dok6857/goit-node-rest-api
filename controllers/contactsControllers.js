// contactControllers

import mongoose from "mongoose";
import {
  listContacts,
  getContactById,
  rewriteContact,
  addContact,
  removeContact,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  console.log({ user: req.user });
  const { _id: owner } = req.user;
  try {
    const contacts = await listContacts(owner);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: ownerId } = req.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw HttpError(400, "Invalid contact ID");
    }

    const contactToFind = await getContactById(id, ownerId);

    if (!contactToFind) {
      throw HttpError(404);
    }

    res.status(200).json(contactToFind);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: ownerId } = req.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw HttpError(400, "Invalid contact ID");
    }

    const contactToDelete = await removeContact(id, ownerId);

    if (!contactToDelete) {
      throw HttpError(404);
    }

    res.status(200).json(contactToDelete);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { name, email, phone } = req.body;
    const addedContact = await addContact({ name, email, phone, owner });
    res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: ownerId } = req.user;
    const { name, email, phone } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw HttpError(400, "Invalid contact ID");
    }

    const updatedContact = await rewriteContact(id, ownerId, {
      name,
      email,
      phone,
    });
    if (!updatedContact) {
      throw HttpError(404);
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: ownerId } = req.user;
    const { favorite } = req.body;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw HttpError(400, "Invalid contact ID");
    }

    const updatedContact = await rewriteContact(contactId, ownerId, {
      favorite,
    });

    if (!updatedContact) {
      throw HttpError(404);
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};
