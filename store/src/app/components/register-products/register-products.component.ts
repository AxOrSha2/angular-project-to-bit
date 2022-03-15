import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-products',
  templateUrl: './register-products.component.html',
  styleUrls: ['./register-products.component.css']
})
export class RegisterProductsComponent implements OnInit {

  productForm: FormGroup;
  form_title = 'Crear producto';
  id: String | null;
  only_numbers = /^([0-9])*$/;
  image: string = "";

  constructor(private fb: FormBuilder, private _productService: ProductService, private router: Router, private idProductPath: ActivatedRoute) {
    this.productForm = this.fb.group({
      name:['',Validators.required],
      price:['',[Validators.required, Validators.pattern(this.only_numbers)]],
      description:['',Validators.required],
      seller:['',Validators.required],
      stock_available:['',[Validators.required, Validators.pattern(this.only_numbers)]]
      // imgPath:['']
    });

    this.id = this.idProductPath.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProductInfo()
  }

  getFile(event:any) {
    const file = event.target.files[0];
    this.convertToBase64(file)
  }

  convertToBase64(file: any) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file,subscriber);
    })
    observable.subscribe((result) => {
      console.log(result)
      this.image = result
    });
  }

  readFile(file: any, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    };

    fileReader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };

  }

  productInfo() {
    const product_form: Product = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      description: this.productForm.get('description')?.value,
      seller: this.productForm.get('seller')?.value,
      stock_available: this.productForm.get('stock_available')?.value,
      imgPath: this.image
    }

    if (this.id === null) {
      // When the product is created
      this._productService.postProducts(product_form).subscribe(data =>{
        this.router.navigate(['/products']);
        
        Swal.fire({
          icon: 'success',
          title: 'Dato guardado',
          text: 'El producto se ha creado correctamente'
        })

      },error =>{
        Swal.fire({
          icon: 'error',
          title: 'Algo esta pasando',
          text: 'Comuniquese con el administrador'
        })
      })
    } else {
      //When the user is updated
      this._productService.putProducts(this.id, product_form).subscribe(data => {
        this.router.navigate(['/products']);

        Swal.fire({
          icon: 'success',
          title: 'Dato actualizado',
          text: 'El producto se actualizó correctamente'
        })

      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Algo esta pasando',
          text: 'Comuniquese con el administrador'
        })
      })
    }
  }

  getProductInfo() {
    if (this.id !== null) {
      this.form_title = 'Actualizar datos';
      this._productService.getProduct(this.id).subscribe(data =>{
        this.image = data.imgPath;
        this.productForm.setValue({
          name: data.name,
          price: data.price,
          description: data.description,
          seller: data.seller,
          stock_available: data.stock_available
          // imgPath: data.imgPath
        })
      },error =>{
        console.log(error);
      });
    }
  }  

}
