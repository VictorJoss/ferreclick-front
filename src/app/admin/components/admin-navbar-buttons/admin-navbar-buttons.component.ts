import { Component } from '@angular/core';
import { UserStorageService } from '../../../services/storage/user-storage.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar-buttons',
  standalone: true,
  imports: [],
  templateUrl: './admin-navbar-buttons.component.html',
  styleUrl: './admin-navbar-buttons.component.css'
})
export class AdminNavbarButtonsComponent {

  constructor(private authService:AuthService, private router:Router){}
  
  logout(){
    UserStorageService.logout();
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
