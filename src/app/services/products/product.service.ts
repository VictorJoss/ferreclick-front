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

  addProduct(productDto: FormData): Observable<any>{
    return this.http.post(BASIC_URL + 'api/products', productDto, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(BASIC_URL + 'api/products', {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}api/products/${productId}`, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/products/category/${categoryId}`, {
      headers: this.apiService.createAuthorizationHeader(),
    });
  }

}
