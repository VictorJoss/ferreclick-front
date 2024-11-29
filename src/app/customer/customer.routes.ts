import { Routes } from "@angular/router";
import { CustomerComponent } from "./customer.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { CarritoDetailsComponent } from "./components/carrito-details/carrito-details.component";

export const CUSTOMER_ROUTES: Routes = [
    {path: '', component: CustomerComponent},
    {path: 'dashboard', component: DashboardComponent},
    { path: 'dashboard/product-details/:id', component: ProductDetailsComponent },
    { path: 'shoppingc-details', component: CarritoDetailsComponent },
]