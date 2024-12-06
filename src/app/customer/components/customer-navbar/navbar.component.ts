import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarButtonsComponent } from '../customer-navbar-buttons/navbar-buttons.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive, NavbarButtonsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  // variables para el buscador y el carrito
  searchTerm: string = '';
  carrito:any;

  constructor(){}

  ngOnInit(): void {

  }

  // metodos para la implementacion del buscador si da tiempo
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchTerm);
  }
}
