import { ApplicationConfig, NgModule } from '@angular/core';
import { PreloadAllModules, provideRouter, RouterModule, Routes, withDebugTracing } from '@angular/router';
import {  AuthGuard,canActivate } from '@angular/fire/auth-guard'; 
import {  hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/login']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe:redirectUnauthorizedToLogin }
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe:redirectUnauthorizedToLogin }
  },
  {
    path: 'application',
    loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe:redirectUnauthorizedToLogin }
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe:redirectUnauthorizedToLogin }
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe:redirectUnauthorizedToLogin }
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe:redirectUnauthorizedToLogin }
  },
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe:redirectUnauthorizedToLogin }
  },
  {
    path: 'providers',
    loadChildren: () => import('./providers/providers.module').then(m => m.ProvidersModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe:redirectUnauthorizedToLogin }
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe:redirectUnauthorizedToLogin }
  },
  {
    path: 'requests',
    loadChildren: () => import('./requests/requests.module').then(m => m.RequestsModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe:redirectUnauthorizedToLogin }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
