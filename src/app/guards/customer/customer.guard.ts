import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  constructor(private router: Router) {}

  // guard para verificar si un usuario es un cliente o no. Si el usuario no es un cliente, se redirige a la página de inicio. Si el usuario es un cliente, se permite el acceso a la ruta solicitada.
  canActivate(): boolean {
    const isCustomer = UserStorageService.isCustomerLoggedIn();
    if (!isCustomer) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}

