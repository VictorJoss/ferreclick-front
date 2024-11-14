import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { UserStorageService } from './services/storage/user-storage.service';
import { InfoTagHomeComponent } from './customer/components/info-tag-home/info-tag-home.component';
import { HeroComponent } from './customer/components/hero/hero.component';
import { HomeAdvantagesComponent } from './customer/components/home-advantages/home-advantages.component';
import { ProductsectionComponent } from './customer/components/productsection/productsection.component';
import { FooterComponent } from './customer/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,
     InfoTagHomeComponent, HeroComponent,
      HomeAdvantagesComponent, ProductsectionComponent,
       FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';

  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router: Router){}

  ngOnInit(): void{
    this.router.events.subscribe(event =>{
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    })
  }
  
}
