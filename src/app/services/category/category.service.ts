import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../util/apiTools/api.service';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private apiService:ApiService) { }

  // metodo para agregar una categoria
  addCategory(categoryDto: any): Observable<any>{
    return this.http.post(BASIC_URL + 'api/product-categories', categoryDto, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  // metodo para obtener todas las categorias
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(BASIC_URL + 'api/product-categories', {
      headers: this.apiService.createAuthorizationHeader()
    });
  }  

  // metodo para obtener una categoria por id
  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}api/product-categories/${categoryId}`, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  // metodo para actualizar una categoria
  uploadCategory(category:any): Observable<any> {
    return this.http.put<any>(`${BASIC_URL}api/product-categories`,category ,{
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  // metodo para eliminar una categoria
  deleteCategoryById(categoryId: number): Observable<any> {
    return this.http.delete<any>(`${BASIC_URL}api/product-categories/${categoryId}`, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

  // {id,nombre,descripcion,[]} --> DTO
}
