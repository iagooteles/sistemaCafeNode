import { AfterViewInit, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../services/snackbar.service';
import { GlobalConstants } from '../../shared/global-constants';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppSidebarComponent } from "../layouts/sidebar/sidebar.component";
import { NavbarComponent } from "../layouts/navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, MatCardModule, RouterLink, HttpClientModule, AppSidebarComponent, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit{
  responseMessage:any;
  data:any;
  isMenuOpen = false;

  ngAfterViewInit(): void { }

  constructor(
    private dashboardService: DashboardService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ){
    this.ngxService.start();
    this.dashboardData();
  }

  dashboardData() {
    this.dashboardService.getDetails().subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.data = response.data;
      },
      error: (error: any) => {
        this.ngxService.stop();
        console.log(error);
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, "error");
      }
    });
  }

}
