let addressBookContactList;

window.addEventListener('DOMContentLoaded',(event) =>{
    if(site_properties.use_local_storage.match('true')){
        getAddressBookContactsFromStorage();
    }
    else getAddressBookContactsFromServer();
});

const processAddressBookDataResponse = () => {
    createInnerHtml();
    localStorage.removeItem("EditContact");
}

const getAddressBookContactsFromStorage = () => {
    addressBookContactList = localStorage.getItem('AddressBookContactList') ? JSON.parse(localStorage.getItem('AddressBookContactList')) : [];
    processAddressBookDataResponse();
}

const getAddressBookContactsFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true)
        .then( responseText => {
            addressBookContactList = JSON.parse(responseText);
            processAddressBookDataResponse();
        })
        .catch(error =>{
            console.log("GET Error Status: "+ JSON.stringify(error));
            addressBookContactList = [];
            processAddressBookDataResponse();
        });
}

const createInnerHtml = () => {
    if(addressBookContactList.length == 0){
        document.querySelector('#table-display').innerHTML = `<h2 class="no-contact-notification">Oops... No Contacts</h2>`;
        return;
    } 
    const headerHtml = "<tr><th>Full Name</th><th>Address</th><th>City</th><th>State</th><th>ZipCode</th><th>Phone Number</th><th></th></tr>";
    let innerHtml = `${headerHtml}`;
    for (const contact of addressBookContactList){
        innerHtml = `${innerHtml}
        <tr>
            <td>${contact._name} </td>
            <td>${contact._address} </td>
            <td>${contact._city} </td>
            <td>${contact._state} </td>
            <td>${contact._zip} </td>
            <td>${contact._phoneNumber} </td>
            <td>
                <img id="${contact.id}" class="delete-icon" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                <img id="${contact.id}" class="edit-icon" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
            </td>
        </tr>`;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove = (node) => {
    let contact = addressBookContactList.find( contact => contact.id == node.id);
    if(!contact) return;
    const index = addressBookContactList.map(contact => contact.id)
                                        .indexOf(contact.id);
    addressBookContactList.splice(index,1);
    localStorage.setItem("AddressBookContactList",JSON.stringify(addressBookContactList));
    createInnerHtml();
}

const update = (node) => {
    let contact = addressBookContactList.find(contact => contact.id == node.id);
    if(!contact) return;
    localStorage.setItem("EditContact",JSON.stringify(contact));
    window.location.replace(site_properties.add_person_page);
}