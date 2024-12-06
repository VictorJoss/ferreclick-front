import { Injectable } from '@angular/core';
import { ApiService } from '../../util/apiTools/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private apiService:ApiService, private http: HttpClient) { }

  //metodo para agregar un producto
  addProduct(productDto: FormData): Observable<any>{
    return this.http.post(BASIC_URL + 'api/products', productDto, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  //metodo para obtener todos los productos
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(BASIC_URL + 'api/products', {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  //metodo para obtener un producto por su id
  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}api/products/${productId}`, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  //metodo para obtener los productos de una categoria
  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/products/category/${categoryId}`, {
      headers: this.apiService.createAuthorizationHeader(),
    });
  }
  
  //metodo para actualizar un producto
  updateProduct(productDto: FormData): Observable<any>{
    return this.http.put(BASIC_URL + 'api/products', productDto, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  //metodo para eliminar un producto
  deleteProductById(productId: number): Observable<any> {
    return this.http.delete<any>(`${BASIC_URL}api/products/${productId}`, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }
}
