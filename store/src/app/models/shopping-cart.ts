export class ShoppingCart {

    _id?:any;
    name: string;
    price: string;
    description: string;
    seller: string;
    stock_available: number;

    constructor(name: string, price: string, description: string, seller: string,stock_available: number) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.seller = seller;
        this.stock_available = stock_available;
    }
}