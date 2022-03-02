import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: Product[] = [];
  shoppingCartList: any = []

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.productList = data
      console.log(this.productList)
    }, error => {
      console.log(error)
    })
  }

  addToShoppingCart(idProduct: string, nameProduct: string, priceByProductUnit: number, amountProduct: number): void {

    var eachProduct: ShoppingCart = {
      idProduct: idProduct,
      nameProduct: nameProduct,
      priceByProductUnit: priceByProductUnit,
      amountProduct: amountProduct
    }

    this.shoppingCartList.push(eachProduct);
    sessionStorage.setItem('addedProductList', JSON.stringify(this.shoppingCartList));

    if (sessionStorage.getItem('addedProductList')) {
      Swal.fire({
        icon: 'success',
        title: 'Añadido al carrito con éxito'
      })
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Ha ocurrido un error inesperado'
      })
    }
  }

}
