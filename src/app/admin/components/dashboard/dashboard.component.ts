import { Component } from '@angular/core';
import { NavbarComponent } from '../admin-navbar/navbar.component';
import { ChartDisplayComponent } from "../chart-display/chart-display.component";
import { MetricsComponent } from "../metrics/metrics.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, ChartDisplayComponent, MetricsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
}
