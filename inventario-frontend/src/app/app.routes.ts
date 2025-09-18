import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list.component';
import { ProductFormComponent } from './product/product-form.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'productos', component: ProductListComponent, canActivate: [AuthGuard] },
	{ path: 'productos/nuevo', component: ProductFormComponent, canActivate: [AuthGuard] },
	{ path: 'productos/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: '' }
];
