const fs = require('fs').promises;
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
    try {
        const result = await fs.readFile(contactsPath, 'utf8');
        return JSON.parse(result);
    } catch (error) {
        console.log(error);
    };
};

const getContactById = async (contactId) => {
    try {
        const id = String(contactId);
        const contacts = await listContacts();
        const result = await contacts.find(item => item.id === id);

        return result || null;
    } catch (error) {
        console.log(error);
    }
}

const removeContact = async (contactId) => {
    try {
        const id = String(contactId);
        const contacts = await listContacts();
        const indexContact = contacts.findIndex(item => item.id === id);
        if (indexContact === -1) {
            return null;
        }

        const [result] = contacts.splice(indexContact, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return result;
    } catch (error) {
        console.log(error);
    }
}

const addContact = async ({ name, email, phone }) => {
    try {
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
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
}