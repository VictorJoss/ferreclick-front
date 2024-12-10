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
  // Variables para las graficas y metricas
  @ViewChild('pieChart') pieChart?: BaseChartDirective;
  @ViewChild('pieChart2') pieChart2?: BaseChartDirective;
  archivos: any[] = [];
  archivos2: any[] = [];
  isBrowser: boolean;
  lineasDeCodigo:number;
  lineasDeCodigoComentadas:number;
  totalMetrica:string;

  lineasDeCodigoJava:number;
  lineasDeCodigoComentadasJava:number;
  totalMetricaJava:string;

  // Inicio Grafico de Pai

  // Configuracion del grafico de pai
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

    // Configuracion del grafico de pai Java
    pieChartData2: ChartConfiguration<'pie'>['data'] = {
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
  
    pieChartOptions2: ChartConfiguration<'pie'>['options'] = {
      responsive: true,
      plugins: {
        title: { display: true, text: '' }
      }
    };
  
    // Final Grafico de Pai


  // Nos traemos los datos de la API y los guardamos en la variable archivos. Luego, calculamos el total de líneas de código y líneas de código comentadas. Con estos datos, calculamos la métrica y actualizamos el gráfico de pai.
  constructor(private http: HttpClient,
    private analyticsService: AnalyticsService, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // cargamos los datos en el ngOnInit
  ngOnInit(): void {
    this.cargarDatos();
  }

  // Metodo para cargar los datos de la API
  cargarDatos() {
    this.http.get<any[]>('http://localhost:8080/api/contar-lineas').subscribe(data => {
      this.archivos = data;
      this.totalDeLineas();
      this.calcularMetrica();
      this.graficoMetricas();
    }, error => {
      console.error('Error al obtener los datos:', error);
    });

    this.http.get<any[]>('http://localhost:8080/api/contar-lineas-java').subscribe(data => {
      this.archivos2 = data;
      console.log(this.archivos2);
      this.totalDeLineasJava();
      this.calcularMetricaJava();
      this.graficoMetricasJava();
    }, error => {
      console.error('Error al obtener los datos:', error);
    });
  }

  // Metodo para calcular el total de lineas de codigo y lineas de codigo comentadas
  totalDeLineas():void{
    this.lineasDeCodigo = this.archivos.reduce((total, archivo) => total + archivo.lineasCodigo, 0);
    this.lineasDeCodigoComentadas = this.archivos.reduce((total, archivo) => total + archivo.lineasComentario, 0);
  }

  // Metodo para calcular el total de lineas de codigo y lineas de codigo comentadas
  totalDeLineasJava():void{
    this.lineasDeCodigoJava = this.archivos2.reduce((total, archivo) => total + archivo.lineasCodigo, 0);
    this.lineasDeCodigoComentadasJava = this.archivos2.reduce((total, archivo) => total + archivo.lineasComentario, 0);
  }

  // Metodo para actualizar el grafico de pai
  graficoMetricas():void{
    this.pieChartData.labels = ['LC', 'LCC'];
    this.pieChartData.datasets[0].data = [this.lineasDeCodigo, this.lineasDeCodigoComentadas];
    this.pieChart?.update();
  }

  // grafico de pai Java
  graficoMetricasJava():void{
    this.pieChartData2.labels = ['LC', 'LCC'];
    this.pieChartData2.datasets[0].data = [this.lineasDeCodigoJava, this.lineasDeCodigoComentadasJava];
    this.pieChart2?.update();
  }

  // Metodo para calcular la metric
  calcularMetrica():void{
    this.totalMetrica = ((this.lineasDeCodigoComentadas/this.lineasDeCodigo)*100).toString().slice(0,4);
  }

  // Metodo para calcular la metrica Java
  calcularMetricaJava():void{
    this.totalMetricaJava = ((this.lineasDeCodigoComentadasJava/this.lineasDeCodigoJava)*100).toString().slice(0,4);
  }

}
