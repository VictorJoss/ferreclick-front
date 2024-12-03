import { Routes } from "@angular/router";
import { GeneralDashboardComponent } from "./components/general-dashboard/general-dashboard.component";
import { GeneralProductDetailsComponent } from "./components/general-product-details/general-product-details.component";
import { AllProductsComponent } from "../UtilitiesComponents/all-products/all-products.component";


export const GENERAL_ROUTES: Routes = [
    {path: 'dashboard', component: GeneralDashboardComponent},
    {path: 'dashboard/product-details/:id', component: GeneralProductDetailsComponent},
    {path: 'allproducts', component:AllProductsComponent}
]