let contactDataObj = {};

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
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setContactDataObj();
    alert(JSON.stringify(contactDataObj));
}

const setContactDataObj = () => {
    contactDataObj.id = createContactId();
    contactDataObj._name = getValueById('#name');
    contactDataObj._phoneNumber = getValueById('#phone');
    contactDataObj._address = getValueById('#address');
    contactDataObj._city = getValueById('#city');
    contactDataObj._state = getValueById('#state');
    contactDataObj._zip = getValueById('#zip');
}

const createContactId = () => {
    return new Date().getTime();
}

const getValueById = (value) => {
    return document.querySelector(value).value;
}