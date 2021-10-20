let addressBookContactList;

window.addEventListener('DOMContentLoaded',(event) =>{
    addressBookContactList = getAddressBookContactsFromStorage();
    createInnerHtml();
});

const getAddressBookContactsFromStorage = () => {
    return localStorage.getItem('AddressBookContactList') ? JSON.parse(localStorage.getItem('AddressBookContactList')) : [];
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
                <img id="${contact.id}" class="delete-icon" onclick="" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                <img id="${contact.id}" class="edit-icon" alt="edit" onclick="" src="../assets/icons/create-black-18dp.svg">
            </td>
        </tr>`;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}