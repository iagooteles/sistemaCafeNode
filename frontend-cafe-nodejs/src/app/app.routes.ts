import type { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RouteGuardService } from './services/route-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageCategoryComponent } from './components/material-component/manage-category/manage-category.component';
import { ManageProductComponent } from './components/material-component/manage-product/manage-product.component';

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

  {
    path: 'cafe/category',
    component: ManageCategoryComponent,
    canActivate:[RouteGuardService],
    data: {
        expectedRole:['admin']
    }
  },

  {
    path: 'cafe/product',
    component: ManageProductComponent,
    canActivate:[RouteGuardService],
    data: {
        expectedRole:['admin']
    }
  },

  { path: '**', redirectTo: '/cafe' }
];