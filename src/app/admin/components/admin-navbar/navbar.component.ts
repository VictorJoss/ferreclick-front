import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminNavbarButtonsComponent } from "../admin-navbar-buttons/admin-navbar-buttons.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AdminNavbarButtonsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
