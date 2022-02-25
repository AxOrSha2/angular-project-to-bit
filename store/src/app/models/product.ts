export class product {

    _id?:any;
    name: string;
    price: string;
    stock_available: number;

    constructor(name: string, price: string, stock_available: number) {
        this.name = name;
        this.price = price;
        this.stock_available = stock_available;
    }
}