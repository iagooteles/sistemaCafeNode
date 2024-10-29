import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../../material-component/dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from '../../material-component/dialog/change-password/change-password.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  displayedColumns:string[] = ['name', 'edit'];
  dataSource:any;
  responseMessage:any;
  isMenuOpen = false;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

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
}
