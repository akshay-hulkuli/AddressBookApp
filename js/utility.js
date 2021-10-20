const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z][a-zA-Z]{2,}([ ][A-Z][a-zA-Z]*)?$');
    if(!nameRegex.test(name))
        throw "Name is Incorrect";
}

const checkPhoneNumber = (phoneNumber) => {
    let phoneNumberRegex = RegExp('^(([+]?[1-9][0-9])?)([6-9][0-9]{9})$');
    if(!phoneNumberRegex.test(phoneNumber))
        throw "Phone number is incorrect";
}

const checkAddress = (address) => {
    let addressRegex = RegExp('[a-zA-Z]{3,}[ ](([a-zA-Z]{3,})+)');
    if(!addressRegex.test(address))
        throw "Address is Incorrect";
}

const checkZip = (zip) => {
    let zipRegex = RegExp('(^[0-9]{3})([ ]?)([0-9]{3}$)');
    if(!zipRegex.test(zip))
        throw "Zip Code is wrong";
}

function checkform()
{
    let formElements = document.getElementById("myform").elements;
    // console.log(formElements.length);
    let cansubmit = true;
    for (let i = 0; i < formElements.length-2; i++) {
        if (formElements[i].value.length == 0) cansubmit = false;
    }
    if (cansubmit) {
        document.getElementById('submitButton').disabled = false;
    }
}