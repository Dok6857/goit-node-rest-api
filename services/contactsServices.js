import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";

const contactsPath = path.join('./db', 'contacts.json');

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: 'utf-8' });
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const foundContact = contacts.find(contact => contact.id === contactId);
    return foundContact || null;
  } catch (error) {
    return null;
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index !== -1) {
      const removedContact = contacts.splice(index, 1)[0];
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return removedContact;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {id: nanoid(), name, email, phone}
     contacts.push(newContact)
     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
     return newContact
  } catch (error) {
    return null;
  }
}


