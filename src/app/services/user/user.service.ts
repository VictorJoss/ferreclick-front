import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../util/apiTools/api.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService:ApiService, private http: HttpClient) { }

  // obtiene todos los usuarios
  getUser(userId:any): Observable<any[]> {
    return this.http.get<any[]>(BASIC_URL + `api/user/${userId}`, {
      headers: this.apiService.createAuthorizationHeader()
    });
  }

}
