import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarButtonsComponent } from '../navbar-buttons/navbar-buttons.component';
import { FormsModule } from '@angular/forms';
import { UserStorageService } from '../services/storage/user-storage.service';
import { Router } from '@angular/router';
import { CarritoService } from '../services/carrito/carrito.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, NavbarButtonsComponent,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  searchTerm: string = '';
  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  carrito:any;

  constructor(private UserStorageService:UserStorageService, private router:Router, private carritoService:CarritoService){}

  ngOnInit(): void {
    this.router.events.subscribe(event =>{
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
    })
  }

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchTerm);
  }
}
