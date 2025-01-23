import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { InvoicesComponent } from './features/invoices/invoices.component';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'invoices', component: InvoicesComponent, canActivate: [AuthGuard] },
  { path: 'profile', component:  ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];
