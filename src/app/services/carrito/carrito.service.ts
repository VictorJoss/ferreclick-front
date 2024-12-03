import { Injectable } from '@angular/core';
import { ApiService } from '../../util/apiTools/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private apiService:ApiService, private http: HttpClient) { }

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

  getCartByUserId(userId:any): Observable<any[]> {
    return this.http.get<any[]>(BASIC_URL + `api/cart/${userId}`, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  removeCartByUserId(userId:any, productId:any): Observable<any[]> {
    return this.http.delete<any[]>(BASIC_URL + `api/cart/remove-product/${userId}/${productId}`, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  removeAllCartByUserId(userId:any): Observable<any[]>{
    return this.http.delete<any[]>(BASIC_URL + `api/cart/remove-product/all/${userId}`, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

}
