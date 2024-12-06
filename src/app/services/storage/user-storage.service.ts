import { Injectable } from '@angular/core';

const TOKEN = 'ecom-token';
const USER_ROLE = 'ecom-role';
const USER_ID = 'ecom-id';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  
  // mira si localStorage está disponible
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  // guarda el token en localStorage
  public saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(TOKEN, token);
    }
  }

  // guarda el rol del usuario en localStorage
  public saveUserRoleFromToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      const role = decodedPayload.role;
      localStorage.setItem(USER_ROLE, role);
    }
  }

  // obtiene el token del localStorage
  static getToken(): string | null {
    if (typeof window !== 'undefined' && !!window.localStorage) {
      return localStorage.getItem(TOKEN);
    }
    return null;
  }

  // obtiene el rol del usuario del localStorage
  static getUserRole(): string | null {
    if (typeof window !== 'undefined' && !!window.localStorage) {
      return localStorage.getItem(USER_ROLE);
    }
    return null;
  }

  // obtiene el id del usuario del localStorage
  static getUserId(): string | null {
    if (typeof window !== 'undefined' && !!window.localStorage) {
      const userId = localStorage.getItem(USER_ID);
      return userId;
    }
    return null;
  }

  // comprueba si el admin está logueado
  static isAdminLoggedIn(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  // comprueba si el usuario está logueado
  static isCustomerLoggedIn(): boolean {
    return this.getUserRole() === 'CUSTOMER';
  }

  // cierra la sesión
  static logout(): void {
    if (typeof window !== 'undefined' && !!window.localStorage) {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USER_ROLE);
      localStorage.removeItem(USER_ID);
    }
  }

  // guarda el id del usuario en localStorage
  public saveUserIdFromToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      const userId = decodedPayload.userId;
      localStorage.setItem(USER_ID, userId);
    }
  }
}
