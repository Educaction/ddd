export default class Address {
    _street: string = "";
    _number: number = 0;
    _zip: string = "";
    _city: string = "";

    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
        this.validate()
    }

    validate() {
        if (this._street.length === 0) {
            throw new Error("Street is required.");
        }
        if (this._number === 0) {
            throw new Error("Number is required.");
        }
        if (this._zip.length === 0) {
            throw new Error("Zip is required.");
        } 
        if (this._city.length === 0) {
            throw new Error("City is required.");
        }                  
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._zip}, ${this._city}`;
    }
    get street(): string {
        return this._street;
    }

    set street(street: string) {
        this._street = street;
    }

    get number(): number {
        return this._number;
    }

    set number(number: number) {
        this._number = number;
    }

    get zip(): string {
        return this._zip;
    }

    set zip(zip: string) {
        this._zip = zip;
    }

    get city(): string {
        return this._city;
    }

    set city(city: string) {
        this._city = city;
    }
}

// Example usage:
const address = new Address("Main St", 123, "12345", "Anytown");
console.log(address);
