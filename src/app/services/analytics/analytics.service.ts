import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// interface para los datos del gráfico
interface ChartData {
  id: number;
  label: string;
  value: number;
}

// URL base de la API
const BASIC_URL = "http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})

export class AnalyticsService {
  // Datos de ejemplo para el gráfico
  private sampleData: ChartData[] = [
    { id: 1, label: 'Jan 2024', value: 1250 },
    { id: 2, label: 'Feb 2024', value: 1580 },
    { id: 3, label: 'Mar 2024', value: 1890 },
    { id: 4, label: 'Apr 2024', value: 2100 },
    { id: 5, label: 'May 2024', value: 1950 },
    { id: 6, label: 'Hola', value: 4340 }
  ];
 
  // Método para obtener los datos de ejemplo
  getSampleData(): ChartData[] {
    return this.sampleData;
  }
  
  // BehaviorSubject para los datos del gráfico
  private chartData = new BehaviorSubject<ChartData[]>([]);
  chartData$ = this.chartData.asObservable();


  // Constructor de la clase
  constructor(private http: HttpClient) {
    this.initializeWithSampleData();
  }

  // Método para inicializar los datos del gráfico con los datos de ejemplo
  private initializeWithSampleData(): void {
    const sampleData = this.getSampleData();
    this.chartData.next(sampleData);
  }

  // Método para obtener los datos del gráfico
  getMonthlyRevenue() {
    return this.http.get<{ month: number; revenue: number }[]>(BASIC_URL + 'api/analytics/monthly-revenue');
  }

  // Método para obtener los datos de los productos más vendidos
  getTopProducts() {
    return this.http.get<{ productName: string; totalSold: number }[]>(BASIC_URL + 'api/analytics/top-products');
  }

  // Método para obtener la distribución de categorías
  getCategoryDistribution() {
    return this.http.get<{ categoryName: string; count: number }[]>(BASIC_URL + 'api/analytics/category-distribution');
  }
}
