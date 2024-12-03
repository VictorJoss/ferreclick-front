import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeneralNavbarComponent } from '../general-navbar/general-navbar.component';
import { FooterComponent } from '../../../customer/components/footer/footer.component';
import { InfoTagHomeComponent } from "../../../UtilitiesComponents/info-tag-home/info-tag-home.component";
import { HeroComponent } from "../../../UtilitiesComponents/hero/hero.component";
import { HomeAdvantagesComponent } from "../../../UtilitiesComponents/home-advantages/home-advantages.component";
import { GeneralProductSectionComponent } from "../general-product-section/general-product-section.component";

@Component({
  selector: 'app-general-dashboard',
  standalone: true,
  imports: [RouterOutlet, GeneralNavbarComponent, FooterComponent, InfoTagHomeComponent, HeroComponent, HomeAdvantagesComponent, GeneralProductSectionComponent],
  templateUrl: './general-dashboard.component.html',
  styleUrl: './general-dashboard.component.css'
})
export class GeneralDashboardComponent {

}
