import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list.component';
import { ProductFormComponent } from './product/product-form.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'productos', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'productos/nuevo', component: ProductFormComponent, canActivate: [AuthGuard] },
  { path: 'productos/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
