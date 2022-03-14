import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productList: Product[] = [];

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._productService.getProducts().subscribe(data =>{
      this.productList = data
    },error=>{
      console.log(error)
    });
  }

  deleteProduct(id: String) {
    Swal.fire({
      title: '¿Seguro de eliminar el producto?',
      text: "Esta accion no se podra deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._productService.deleteProduct(id).subscribe(data =>{
          Swal.fire({
            icon: 'success',
            title: 'Producto eliminado'
          })
        this.getUsers()
        }, error => {
          console.log(error)
        })
      }
    })
  }

}
