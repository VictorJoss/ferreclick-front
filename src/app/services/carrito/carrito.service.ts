import { Injectable } from '@angular/core';
import { ApiService } from '../../util/apiTools/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private apiService:ApiService, private http: HttpClient) { }

  // metodo para agregar un producto al carrito
  addCarrito(cartDto:any):Observable<any>{
    return this.http.post(BASIC_URL + 'api/cart/add-product', cartDto, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  // DTO Example
  // {
  //   "userId": 1,
  //   "productId": 3,
  //   "quantity": 4
  // }

  // metodo para obtener el carrito de un usuario
  getCartByUserId(userId:any): Observable<any[]> {
    return this.http.get<any[]>(BASIC_URL + `api/cart/${userId}`, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  // metodo para eliminar un producto
  removeCartByUserId(userId:any, productId:any): Observable<any[]> {
    return this.http.delete<any[]>(BASIC_URL + `api/cart/remove-product/${userId}/${productId}`, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  // metodo para eliminar todos los productos del carrito
  removeAllCartByUserId(userId:any): Observable<any[]>{
    return this.http.delete<any[]>(BASIC_URL + `api/cart/remove-product/all/${userId}`, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  // metodo para pagar el carrito
  payCart(userId:any): Observable<any[]>{
    return this.http.post<any[]>(BASIC_URL + `api/cart/pay/${userId}`,{}, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }
}
