import { Routes } from "@angular/router";
import { CustomerComponent } from "./customer.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

export const CUSTOMER_ROUTES: Routes = [
    {path: '', component: CustomerComponent},
    {path: 'dashboard', component: DashboardComponent}
]