class Contact {
    id;
    get name() {return this._name; }
    set name(name){
        let nameRegex = RegExp('^[A-Z][a-zA-Z]{2,}([ ][A-Z][a-zA-Z]*)?$');
        if(nameRegex.test(name)) 
            this._name = name;
        else throw "Name is Incorrect";
    }

    get address() { return this._address; }
    set address(address) {
        let addressRegex = RegExp('[a-zA-Z]{3,}(([ ][a-zA-Z]{3,})+)');
        if(addressRegex.test(address))
        this._address = address;
        else throw "Address is Incorrect";
    }

    get phoneNumber() { return this._phoneNumber; }
    set phoneNumber(phoneNumber) {
        let phoneNumberRegex = RegExp('^(([+]?[1-9][0-9])?)([6-9][0-9]{9})$');
        if(phoneNumberRegex.test(phoneNumber))
            this._phoneNumber = phoneNumber;
        else throw "Phone number is incorrect";
    }
    
    get city() { return this._city; }
    set city(city) {
        this._city = city;
    }

    get state() { return this._state; }
    set state(state) {
        this._state = state;
    }

    get zip() { return this._zip; }
    set zip(zip) {
        let zipRegex = RegExp('(^[0-9]{3})([ ]?)([0-9]{3}$)')
        if(zipRegex.test(zip))
            this._zip = zip;
        else throw "Zip Code is wrong";
    }

    toString() {
        return "Name: "+ this._name+", PhoneNumber: "+ this._phoneNumber+ ", Address: "+ this._address+", City: "+ this._city + ", State: "+ this._state + 
                ", Zip Code: "+ this._zip;
    }
}

