import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './customer/components/dashboard/dashboard.component';
import { GeneralComponent } from './general/general.component';

export const routes: Routes = [
    {path: '', component: GeneralComponent},
    {path: 'signUp', component: SignupComponent},
    {path: 'login', component:LoginComponent},
    {path: 'admin', loadChildren: ()=> import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)},
    {path: 'customer', loadChildren: ()=> import('./customer/customer.routes').then(m => m.CUSTOMER_ROUTES)}
];
