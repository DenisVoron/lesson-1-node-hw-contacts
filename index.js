//const argv = require("yargs").argv;

const contacts = require("./contacts")

//console.log(argv);

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const contactsList = await contacts.listContacts();
            console.log(contactsList)
            break;

        case "get":
            const oneContact = await contacts.getContactById(id);
            console.log(oneContact);
            break;

        case "add":
            const newContact = await contacts.addContact({ name, email, phone });
            console.log(newContact)
            break;

        case "remove":
            const deleteContact = await contacts.removeContact(id);
            console.log(deleteContact);
            break;
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

//invokeAction({ action: "list" }); //argv
//invokeAction({ action: "get", id: "0" })
//invokeAction({ action: "add", name: "Dadert", email: "Dadert@mail.vorm", phone: "+234 45 67" })
invokeAction({ action: "remove", id: "p5Ac5_v5qEG0-y60hVcCq" })