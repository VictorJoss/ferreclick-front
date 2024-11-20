import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PostCategoryComponent } from "./components/post-category/post-category.component";
import { PostProductComponent } from "./components/post-product/post-product.component";
import { AdminGuard } from "../guards/admin/admin.guard";

export const ADMIN_ROUTES: Routes = [
    {path: '', component: AdminComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard]},
    {path: 'category', component: PostCategoryComponent, canActivate: [AdminGuard]},
    {path: "products", component: PostProductComponent, canActivate: [AdminGuard]}
]