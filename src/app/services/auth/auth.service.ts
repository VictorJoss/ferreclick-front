import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

// URL base de la API
const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient, 
    private userStorageService: UserStorageService
  ) {}

  // Método para iniciar sesión
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
            this.userStorageService.saveUserIdFromToken(jwt);
            return true;
          }
          return false;
        })
      );
  }

  // Método para registrar un usuario
  register(name: string, username: string, email: string, password: string, role: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { name, username, email, password, role };

    return this.http.post(`${BASIC_URL}api/auth/register`, body, { headers })
      .pipe(
        map(() => {
          return true;
        }),
        catchError((error) => {
          if (error.status === 409) { // Usuario ya existe
            console.error('Error: Usuario ya existe.');
          } else {
            console.error('Error en el registro:', error);
          }
          return of(false);
        })
      );
  }

  // Método para cerrar sesión
  logout(): Observable<void> {
    return this.http.post<void>(`${BASIC_URL}api/auth/logout`, {});
  }
}

