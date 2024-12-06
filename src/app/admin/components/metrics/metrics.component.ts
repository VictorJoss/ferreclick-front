import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { AnalyticsService } from '../../../services/analytics/analytics.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.css'
})
export class MetricsComponent implements OnInit{
  @ViewChild('pieChart') pieChart?: BaseChartDirective;
  archivos: any[] = [];
  isBrowser: boolean;
  lineasDeCodigo:number;
  lineasDeCodigoComentadas:number;
  totalMetrica:string;

  // Inicio Grafico de Pai

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)'
      ]
    }]
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: '' }
    }
  };

  // Final Grafico de Pai

  constructor(private http: HttpClient,
    private analyticsService: AnalyticsService, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.http.get<any[]>('http://localhost:8080/api/contar-lineas').subscribe(data => {
      this.archivos = data;
      this.totalDeLineas();
      this.calcularMetrica();
      this.graficoMetricas();
    }, error => {
      console.error('Error al obtener los datos:', error);
    });
  }

  totalDeLineas():void{
    this.lineasDeCodigo = this.archivos.reduce((total, archivo) => total + archivo.lineasCodigo, 0);
    this.lineasDeCodigoComentadas = this.archivos.reduce((total, archivo) => total + archivo.lineasComentario, 0);
  }

  graficoMetricas():void{
    this.pieChartData.labels = ['LC', 'LCC'];
    this.pieChartData.datasets[0].data = [this.lineasDeCodigo, this.lineasDeCodigoComentadas];
    this.pieChart?.update();
  }

  calcularMetrica():void{
    this.totalMetrica = ((this.lineasDeCodigoComentadas/this.lineasDeCodigo)*100).toString().slice(0,4);
  }

}
