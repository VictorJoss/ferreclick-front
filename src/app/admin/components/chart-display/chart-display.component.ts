import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { AnalyticsService } from '../../../services/analytics/analytics.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-chart-display',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './chart-display.component.html',
  styleUrl: './chart-display.component.css'
})
export class ChartDisplayComponent implements OnInit{
  @ViewChild('barChart') barChart?: BaseChartDirective;
  @ViewChild('lineChart') lineChart?: BaseChartDirective;
  @ViewChild('pieChart') pieChart?: BaseChartDirective;
  @ViewChild('doughnutChart') doughnutChart?: BaseChartDirective;
  @ViewChild('radarChart') radarChart?: BaseChartDirective;
  @ViewChild('polarChart') polarChart?: BaseChartDirective;

  isBrowser: boolean;

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Analytics Data',
      backgroundColor: 'rgba(0,123,255,0.5)',
      borderColor: 'rgb(0,123,255)',
    }]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Bar Char Analysisxxdfd' }
    }
  };

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Analytics Trend',
      fill: false,
      tension: 0.1,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }]
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Line Trend Analysis' }
    }
  };

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
      title: { display: true, text: 'Distribution Analysis' }
    }
  };

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
      title: { display: true, text: 'test' }
    }
  };

  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
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

  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Doughnut Analysis' }
    }
  };

  radarChartData: ChartConfiguration<'radar'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Radar Analysis',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
    }]
  };

  radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Radar Analysis' }
    }
  };

  polarChartData: ChartConfiguration<'polarArea'>['data'] = {
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

  polarChartOptions: ChartConfiguration<'polarArea'>['options'] = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Polar Area Analysis' }
    }
  };

  constructor(
    private analyticsService: AnalyticsService, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.analyticsService.chartData$.subscribe(data => {
      this.pieChart2(data);
    });

    this.analyticsService.getMonthlyRevenue().subscribe(data => {
      const labels = data.map(item => `Mes ${item.month}`);
      const values = data.map(item => item.revenue);
      this.barChartData.labels = labels;
      this.barChartData.datasets[0].data = values;
      this.barChartData.datasets[0].label = "Total de ingresos por mes" 
      this.barChartOptions.plugins.title.text = "Descubre cuanto se generó cada mes";
      this.barChart?.update();
    });
  
    this.analyticsService.getTopProducts().subscribe(data => {
      const labels = data.map(item => item.productName);
      const values = data.map(item => item.totalSold);
      this.pieChartData.labels = labels;
      this.pieChartData.datasets[0].data = values;
      this.pieChartData.datasets[0].label = "Productos más agregados al carrito"
      this.pieChartOptions.plugins.title.text = "Descubre los productos que más estan siendo agregados al carrito"
      this.pieChart?.update();
    });
  
    this.analyticsService.getCategoryDistribution().subscribe(data => {
      const labels = data.map(item => item.categoryName);
      const values = data.map(item => item.count);
      this.doughnutChartData.labels = labels;
      this.doughnutChartData.datasets[0].data = values;
      this.doughnutChart?.update();
    });
  }

  private pieChart2(data: any[]) {
    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);

    this.pieChartData2.labels = ['Hola','Chao'];
    this.pieChartData2.datasets[0].data = [1,2];
    this.pieChart?.update();
  }
}
