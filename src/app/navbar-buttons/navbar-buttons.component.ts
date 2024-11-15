import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';
import { AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-navbar-buttons',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-buttons.component.html',
  styleUrl: './navbar-buttons.component.css'
})
export class NavbarButtonsComponent {

  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit(): void{
    this.router.events.subscribe(event =>{
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    })
  }
  
  logout(){
    UserStorageService.signOut();
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
