import { Injectable } from '@angular/core';

const TOKEN = 'ecom-token';
const USER_ROLE = 'ecom-role';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  public saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(TOKEN, token);
    }
  }

  public saveUserRoleFromToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      const role = decodedPayload.role;
      localStorage.setItem(USER_ROLE, role);
    }
  }

  static getToken(): string | null {
    if (typeof window !== 'undefined' && !!window.localStorage) {
      return localStorage.getItem(TOKEN);
    }
    return null;
  }

  static getUserRole(): string | null {
    if (typeof window !== 'undefined' && !!window.localStorage) {
      return localStorage.getItem(USER_ROLE);
    }
    return null;
  }

  static isAdminLoggedIn(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    return this.getUserRole() === 'CUSTOMER';
  }

  static signOut(): void {
    if (typeof window !== 'undefined' && !!window.localStorage) {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USER_ROLE);
    }
  }
}
