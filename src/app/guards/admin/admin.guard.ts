import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAdmin = UserStorageService.isAdminLoggedIn();
    if (!isAdmin) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}

