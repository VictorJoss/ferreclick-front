import { Component } from '@angular/core';
import { ChartDisplayComponent } from "../chart-display/chart-display.component";
import { NavbarComponent } from '../admin-navbar/navbar.component';

@Component({
  selector: 'app-admin-analitics',
  standalone: true,
  imports: [ChartDisplayComponent, NavbarComponent],
  templateUrl: './admin-analitics.component.html',
  styleUrl: './admin-analitics.component.css'
})
export class AdminAnaliticsComponent {

}
