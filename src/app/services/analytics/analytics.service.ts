import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


interface ChartData {
  id: number;
  label: string;
  value: number;
}

const BASIC_URL = "http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})

export class AnalyticsService {
  
  private sampleData: ChartData[] = [
    { id: 1, label: 'Jan 2024', value: 1250 },
    { id: 2, label: 'Feb 2024', value: 1580 },
    { id: 3, label: 'Mar 2024', value: 1890 },
    { id: 4, label: 'Apr 2024', value: 2100 },
    { id: 5, label: 'May 2024', value: 1950 },
    { id: 6, label: 'Hola', value: 4340 }
  ];

  getSampleData(): ChartData[] {
    return this.sampleData;
  }
  
  private chartData = new BehaviorSubject<ChartData[]>([]);
  chartData$ = this.chartData.asObservable();

  constructor(private http: HttpClient) {
    this.initializeWithSampleData();
  }

  private initializeWithSampleData(): void {
    const sampleData = this.getSampleData();
    this.chartData.next(sampleData);
  }

  getMonthlyRevenue() {
    return this.http.get<{ month: number; revenue: number }[]>(BASIC_URL + 'api/analytics/monthly-revenue');
  }

  getTopProducts() {
    return this.http.get<{ productName: string; totalSold: number }[]>(BASIC_URL + 'api/analytics/top-products');
  }

  getCategoryDistribution() {
    return this.http.get<{ categoryName: string; count: number }[]>(BASIC_URL + 'api/analytics/category-distribution');
  }
}
