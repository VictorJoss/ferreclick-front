import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient, 
    private userStorageService: UserStorageService
  ) {}

  login(email: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { email, password };

    return this.http.post<{ jwt: string }>(`${BASIC_URL}api/auth/login`, body, { headers })
      .pipe(
        map((response) => {
          const jwt = response.jwt;
          if (jwt) {
            this.userStorageService.saveToken(jwt);
            this.userStorageService.saveUserRoleFromToken(jwt);
            return true;
          }
          return false;
        })
      );
  }
}

