import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCartList: ShoppingCart[] = [];
  show: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart() {
    //
    this.shoppingCartList = JSON.parse(sessionStorage.getItem("addedProductList") || '[]');
    //
    if (this.shoppingCartList.length == 0) {
      this.show = false;
    }
    console.log(this.shoppingCartList.length)
    console.log(this.shoppingCartList)
  }

  cleanCart(){
    Swal.fire({
      title: '¿Seguro de eliminar el carrito?',
      text: "Esta accion no se podra deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Carrito eliminado'
        })
        sessionStorage.removeItem("addedProductList");
        this.getUserCart()
      }
    })
  }

}
