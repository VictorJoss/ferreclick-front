import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../customer-navbar/navbar.component';
import { InfoTagHomeComponent } from '../../../UtilitiesComponents/info-tag-home/info-tag-home.component';
import { HeroComponent } from '../../../UtilitiesComponents/hero/hero.component';
import { HomeAdvantagesComponent } from '../../../UtilitiesComponents/home-advantages/home-advantages.component';
import { ProductsectionComponent } from '../productsection/productsection.component';
import { FooterComponent } from '../footer/footer.component';
import { ChatBotComponent } from "../chat-bot/chat-bot.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, InfoTagHomeComponent, HeroComponent, HomeAdvantagesComponent, ProductsectionComponent, FooterComponent, ChatBotComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{

}
