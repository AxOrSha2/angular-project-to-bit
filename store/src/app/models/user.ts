export class User {

    _id?:any;
    fullName: string;
    email: string;
    cellphone: string;
    address: string;
    shoppingCart?: any = [];

    constructor(fullName: string, email: string, cellphone: string, address: string) {
        this.fullName = fullName;
        this.email = email;
        this.cellphone = cellphone;
        this.address = address;
    }
}