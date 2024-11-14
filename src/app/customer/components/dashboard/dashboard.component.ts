import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { InfoTagHomeComponent } from '../info-tag-home/info-tag-home.component';
import { HeroComponent } from '../hero/hero.component';
import { HomeAdvantagesComponent } from '../home-advantages/home-advantages.component';
import { ProductsectionComponent } from '../productsection/productsection.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,InfoTagHomeComponent, HeroComponent, HomeAdvantagesComponent, ProductsectionComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
