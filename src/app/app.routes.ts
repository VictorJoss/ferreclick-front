import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: '', redirectTo:'/general/dashboard', pathMatch:"full"},
    {path: 'signUp', component: SignupComponent},
    {path: 'login', component:LoginComponent},
    {path: 'admin', loadChildren: ()=> import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)},
    {path: 'customer', loadChildren: ()=> import('./customer/customer.routes').then(m => m.CUSTOMER_ROUTES)},
    {path: 'general', loadChildren: ()=> import('./general/general.routes').then(m => m.GENERAL_ROUTES)}
];
