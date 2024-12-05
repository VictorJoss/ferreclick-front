import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminNavbarButtonsComponent } from "../admin-navbar-buttons/admin-navbar-buttons.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AdminNavbarButtonsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private router:Router
  ){

  }

  goToAnalytics():void{
    this.router.navigate(["/admin/analytics"])
  }

}
