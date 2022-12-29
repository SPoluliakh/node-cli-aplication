const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = await JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const data = await listContacts();
  const contact = data.find((item) => item.id == id);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (id) => {
  const data = await listContacts();
  const idx = data.findIndex((item) => item.id == id);
  if (idx === -1) {
    return null;
  }
  const updatedContacts = data.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return data[idx];
};

const addContact = async (data) => {
  const result = await listContacts();
  const updatedContact = { ...data, id: v4() };
  result.push(updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(result));
  return updatedContact;
};

const updateContact = async (body) => {
  const { id } = body;
  const result = await listContacts();
  const idx = result.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  result[idx] = { ...body };
  await fs.writeFile(contactsPath, JSON.stringify(result));
  return result[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
