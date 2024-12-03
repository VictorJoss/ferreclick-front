import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-general-navbar-buttons',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './general-navbar-buttons.component.html',
  styleUrl: './general-navbar-buttons.component.css'
})
export class GeneralNavbarButtonsComponent {

}
