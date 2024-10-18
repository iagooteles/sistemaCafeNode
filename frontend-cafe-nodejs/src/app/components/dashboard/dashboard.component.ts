import { AfterViewChecked, AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../services/snackbar.service';
import { GlobalConstants } from '../../shared/global-constants';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppSidebarComponent } from "../layouts/sidebar/sidebar.component";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationComponent } from '../material-component/dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from '../material-component/dialog/change-password/change-password.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, MatCardModule, RouterLink, HttpClientModule, AppSidebarComponent],
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
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    private router: Router,
    private renderer: Renderer2, 
    private el: ElementRef
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

  toggleMenu(event: MouseEvent) {
    event.preventDefault();
    this.isMenuOpen = !this.isMenuOpen;

    const menu = document.querySelector('ul');
    if (this.isMenuOpen) {
      this.renderer.listen('window', 'click', (e: Event) => this.handleClickOutside(e));
    }
  }

  handleClickOutside(event: Event) {
    const clickedInside = this.el.nativeElement.contains(event.target);

    if (!clickedInside && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Deslogar'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((user) => {
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/'])
    })
  }

  changePassword() {    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px"
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }

}
