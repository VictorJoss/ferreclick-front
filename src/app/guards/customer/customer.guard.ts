import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isCustomer = UserStorageService.isCustomerLoggedIn();
    if (!isCustomer) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}

