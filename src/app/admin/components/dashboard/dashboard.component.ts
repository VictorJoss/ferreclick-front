import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../admin-navbar/navbar.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
  archivos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.http.get<any[]>('http://localhost:8080/api/contar-lineas').subscribe(data => {
      this.archivos = data;
    }, error => {
      console.error('Error al obtener los datos:', error);
    });
  }
  
}
