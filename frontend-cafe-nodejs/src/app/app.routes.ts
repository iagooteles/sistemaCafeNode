import type { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RouteGuardService } from './services/route-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'cafe', component: HomeComponent },
    {
      path: 'cafe/dashboard',
      component: DashboardComponent,
      canActivate: [RouteGuardService],
      data: {
          expectedRole: ['admin', 'user']
      }
    },
    { path: '**', redirectTo: '/cafe' }
];