const fs = require('fs').promises;
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
    const result = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(result);
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = await contacts.find(item => item.id === contactId);

    return result || null;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const indexContact = contacts.findIndex(item => item.id === contactId);
    if (indexContact === -1) {
        return null;
    }

    const [result] = contacts.splice(indexContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
}