import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PostCategoryComponent } from "./components/post-category/post-category.component";
import { PostProductComponent } from "./components/post-product/post-product.component";
import { AdminProductComponent } from "./components/admin-product/admin-product.component";
import { AdminCategoriesComponent } from "./components/admin-categories/admin-categories.component";
import { EditProductComponent } from "./components/edit-product/edit-product.component";
import { EditCategoryComponent } from "./components/edit-category/edit-category.component";

// Rutas para el módulo de administración
export const ADMIN_ROUTES: Routes = [
    {path: '', component: AdminComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'category', component: AdminCategoriesComponent},
    {path: 'category/create', component:PostCategoryComponent},
    {path: 'category/edit/:id', component:EditCategoryComponent},
    {path: "products", component: AdminProductComponent},
    {path: "products/create", component: PostProductComponent},
    {path: "products/edit/:id", component: EditProductComponent},
]