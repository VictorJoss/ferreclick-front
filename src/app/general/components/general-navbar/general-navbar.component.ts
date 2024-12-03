import { Component, EventEmitter, Output } from '@angular/core';
import { GeneralNavbarButtonsComponent } from '../general-navbar-buttons/general-navbar-buttons.component';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-general-navbar',
  standalone: true,
  imports: [GeneralNavbarButtonsComponent, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './general-navbar.component.html',
  styleUrl: './general-navbar.component.css'
})
export class GeneralNavbarComponent {
  searchTerm: string = '';
  carrito:any;

  constructor(){}

  ngOnInit(): void {

  }

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchTerm);
  }
}
