export class ShoppingCart {

    idProduct: string;
    nameProduct: string;
    priceByProductUnit: number;
    amountProduct: number;

    constructor(idProduct: string, nameProduct: string, priceByProductUnit: number, amountProduct: number) { 
        this.idProduct = idProduct;
        this.nameProduct = nameProduct;
        this.priceByProductUnit = priceByProductUnit;
        this.amountProduct = amountProduct;
    }
}