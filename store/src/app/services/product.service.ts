import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url_api = 'http://127.0.0.1:9000/api/v1/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.url_api);
  }

  postProducts(product: Product): Observable<any> {
    return this.http.post(this.url_api, product);
  }

  getProduct(id: String): Observable<any> {
    return this.http.get(`${this.url_api}/${id}`)
  }

  putProducts(id: String, product: Product): Observable<any> {
    return this.http.put(`${this.url_api}/${id}`, product)
  }

  deleteProduct(id: String): Observable<any> {
    return this.http.delete(`${this.url_api}/${id}`)
  }

}
