import { Routes } from "@angular/router";
import { CustomerComponent } from "./customer.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { CarritoDetailsComponent } from "./components/carrito-details/carrito-details.component";
import { AllProductsComponent } from "../UtilitiesComponents/all-products/all-products.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";

// Rutas hijas de Customer para el módulo de Customer
export const CUSTOMER_ROUTES: Routes = [
    {path: '', component: CustomerComponent},
    {path: 'dashboard', component: DashboardComponent},
    { path: 'dashboard/product-details/:id', component: ProductDetailsComponent },
    { path: 'shoppingc-details', component: CarritoDetailsComponent },
    { path: 'allproducts', component:AllProductsComponent},
    { path: 'user-details', component:UserDetailsComponent}
]