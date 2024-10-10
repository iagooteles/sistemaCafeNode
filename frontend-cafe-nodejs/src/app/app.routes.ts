import type { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: 'cafe', component: HomeComponent },
    // {
    //   path: 'cafe',
    //   component: FullComponent,
    //   children: [
    //     {
    //       path: '',
    //       redirectTo: '/cafe/dashboard',
    //       pathMatch: 'full',
    //     },
        // {
        //   path: '',
        //   loadChildren:
        //     () => import('./material-component/material.module').then(m => m.MaterialComponentsModule),
        // },
        // {
        //   path: 'dashboard',
        //   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        // }
    //   ]
    // },
    // { path: '**', component: HomeComponent }
  ];