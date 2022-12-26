const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
// const contactsPath = path.resolve("db/contacts.json");
// console.log(contactsPath);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = await JSON.parse(data);
  console.log(contacts);
  return contacts;
};

const getContactById = async (id) => {
  const data = await listContacts();
  const contact = data.find((cont) => cont.id === id);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (id) => {
  const data = await listContacts();
  const idx = data.findIndex((cont) => cont.id === id);
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

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
