import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomeAdvantagesComponent } from "../customer/components/home-advantages/home-advantages.component";
import { HeroComponent } from "../customer/components/hero/hero.component";
import { InfoTagHomeComponent } from "../customer/components/info-tag-home/info-tag-home.component";
import { ProductsectionComponent } from "../customer/components/productsection/productsection.component";
import { FooterComponent } from "../customer/components/footer/footer.component";

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HomeAdvantagesComponent, HeroComponent, InfoTagHomeComponent, ProductsectionComponent, FooterComponent],
  templateUrl: './general.component.html',
  styleUrl: './general.component.css'
})
export class GeneralComponent {

}
