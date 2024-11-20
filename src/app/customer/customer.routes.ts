import { Routes } from "@angular/router";
import { CustomerComponent } from "./customer.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { CustomerGuard } from "../guards/customer/customer.guard";

export const CUSTOMER_ROUTES: Routes = [
    {path: '', component: CustomerComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [CustomerGuard]},
    { path: 'dashboard/product-details/:id', component: ProductDetailsComponent, canActivate: [CustomerGuard]},
]