import {checkAddress, checkPhoneNumber, checkName, checkZip} from '../js/utility.js';
import {site_properties} from '../js/site_properties.js'

let contactDataJsonObj = {};
let isUpdate;

window.addEventListener('DOMContentLoaded', () =>{
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0){
            textError.textContent = "";
            return;
        }
        try{
            checkName(name.value);
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
            checkPhoneNumber(phone.value);
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
            checkAddress(address.value);
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
            checkZip(zip.value);
            zipError.textContent = "";
        } 
        catch(e) {
            zipError.textContent = e;
        }
    });

    checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setContactDataJsonObj();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page)
    }
    catch(e){
        return;
    }
}

const createAndUpdateStorage = () => {
    let addressBookContactList = JSON.parse(localStorage.getItem("AddressBookContactList"));
    if(addressBookContactList){
        let contact = addressBookContactList.find(contact => contact.id == contactDataJsonObj.id);
        if(!contact){
            addressBookContactList.push(contactDataJsonObj);
        }
        else {
            const index = addressBookContactList.map(contact => contact.id)
                                                .indexOf(contactDataJsonObj.id);
            addressBookContactList.splice(index, 1, contactDataJsonObj);
        }
    }
    else {
        addressBookContactList = [contactDataJsonObj];
    }
    localStorage.setItem("AddressBookContactList",JSON.stringify(addressBookContactList));
}



const setContactDataJsonObj = () => {
    if(!isUpdate) contactDataJsonObj.id = createContactId();
    contactDataJsonObj._name = getValueById('#name');
    contactDataJsonObj._phoneNumber = getValueById('#phone');
    contactDataJsonObj._address = getValueById('#address');
    contactDataJsonObj._city = getValueById('#city');
    contactDataJsonObj._state = getValueById('#state');
    contactDataJsonObj._zip = getValueById('#zip');
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

const resetForm = () => {
    setValue('#name','');
    setValue('#phone','');
    setValue('#address','');
    setValue('#city','');
    setValue('#state','');
    setValue('#zip','');
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const checkForUpdate = () => {
    let contact = localStorage.getItem('EditContact');
    isUpdate = contact ? true : false;
    if(!isUpdate) return;
    contactDataJsonObj = JSON.parse(contact);
    setForm();
}

const setForm = () => {
    setValue('#name', contactDataJsonObj._name);
    setValue('#phone',contactDataJsonObj._phoneNumber);
    setValue('#address',contactDataJsonObj._address);
    setValue('#city', contactDataJsonObj._city);
    setValue('#state', contactDataJsonObj._state);
    setValue('#zip', contactDataJsonObj._zip);
}