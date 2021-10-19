let contactDataJsonObj = {};

window.addEventListener('DOMContentLoaded', () =>{
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0){
            textError.textContent = "";
            return;
        }
        try{
            (new Contact()).name = name.value;
            textError.textContent = "";
        } 
        catch(e) {
            textError.textContent = e;
        }
    });

    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector('.phone-error');
    phone.addEventListener('input', function() {
        if(phone.value.length == 0){
            phoneError.textContent = "";
            return;
        }
        try{
            (new Contact()).phoneNumber = phone.value;
            phoneError.textContent = "";
        } 
        catch(e) {
            phoneError.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function() {
        if(address.value.length == 0){
            addressError.textContent = "";
            return;
        }
        try{
            (new Contact()).address = address.value;
            addressError.textContent = "";
        } 
        catch(e) {
            addressError.textContent = e;
        }
    });

    const zip = document.querySelector('#zip');
    const zipError = document.querySelector('.zip-error');
    zip.addEventListener('input', function() {
        if(zip.value.length == 0){
            zipError.textContent = "";
            return;
        }
        try{
            (new Contact()).zip = zip.value;
            zipError.textContent = "";
        } 
        catch(e) {
            zipError.textContent = e;
        }
    });
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setContactDataJsonObj();
        createAndUpdateStorage();
    }
    catch(e){
        return;
    }
}

const createAndUpdateStorage = () => {
    let addressBookContactList = JSON.parse(localStorage.getItem("AddressBookContactList"));
    if(addressBookContactList){
        addressBookContactList.push(setContactData());
    }
    else {
        addressBookContactList = [setContactData()];
    }
    localStorage.setItem("AddressBookContactList",JSON.stringify(addressBookContactList));
}

const setContactDataJsonObj = () => {
    contactDataJsonObj.id = createContactId();
    contactDataJsonObj._name = getValueById('#name');
    contactDataJsonObj._phoneNumber = getValueById('#phone');
    contactDataJsonObj._address = getValueById('#address');
    contactDataJsonObj._city = getValueById('#city');
    contactDataJsonObj._state = getValueById('#state');
    contactDataJsonObj._zip = getValueById('#zip');
}

const setContactData = () => {
    let contact = new Contact();
    contact.id = contactDataJsonObj.id;
    const textError = document.querySelector('.text-error');
    try{
        contact._name = contactDataJsonObj._name;
    }
    catch(e){
        textError.textContent = e;
        throw e;
    }
    const phoneError = document.querySelector('.phone-error');
    try{
        contact._phoneNumber = contactDataJsonObj._phoneNumber;
    }
    catch(e){
        phoneError.textContent = e;
        throw e;
    }
    const addressError = document.querySelector('.address-error');
    try{
        contact._address = contactDataJsonObj._address;
    }
    catch(e){
        addressError.textContent = e;
        throw e;
    }
    contact._city = contactDataJsonObj._city;
    contact._state = contactDataJsonObj._state;
    const zipError = document.querySelector('.zip-error');
    try{
        contact._zip = contactDataJsonObj._zip;
    }
    catch(e){
        zipError.textContent = e;
        throw e;
    }
    alert(contact.toString());
    return contact;
}


const getValueById = (value) => {
    return document.querySelector(value).value;
}

const createContactId = () => {
    let contactID = localStorage.getItem("ContactID");
    contactID = !contactID ? "1" : (parseInt(contactID)+1).toString();
    localStorage.setItem("ContactID",contactID);
    return contactID;
}